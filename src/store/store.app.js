import _ from 'lodash';
import moment from 'moment';

import {
  get_csrf_token,
} from '../util/laravel-api';

import {
  FORM_EVENTS,
  API_EVENT,
  USER_EVENTS,
  PASSWORD_EVENT,
  NAV_EVENTS,
  JANE_TRANSACTIONS,
} from './events';

import { get_logger } from '../util/logger';
import { api_get_user_profile } from './store.user';

const trace = get_logger('STORE_USER');

export const initialize = () => (dispatch) => { trace.log('initialize called');
  const { CONNECTING, CONNECTED, CONNECTION_FAILED } = API_EVENT;
  dispatch({ type: CONNECTING });
  get_csrf_token().then((resp)=> {
    if (window.localStorage.logged_in !== "true") {
      return dispatch({ type: CONNECTED })
    }
    dispatch(api_get_user_profile());
  }).catch(e => dispatch(
    { type: CONNECTION_FAILED }
  ));
}

export const update_form_value = (data) => (dispatch) => {
  const { form_id, field, value } = data;
  dispatch({
    type: FORM_EVENTS.UPDATE_FORM_VALUE,
    payload: { form_id, field, value }
  });
}

export const update_form_values = (form_id, data) => (dispatch) => {
  dispatch({
    type: FORM_EVENTS.UPDATE_FORM_VALUES,
    payload: { form_id, data }
  })
}

export const change_tab = (section_id, tab_id) => (dispatch) => dispatch({
  type: NAV_EVENTS.TAB_CHANGE,
  payload: { section_id, tab_id }
});

export const clear_form_values = (form_id) => (dispatch) => {
  dispatch({
    type: FORM_EVENTS.CLEAR_FORM_VALUES,
    payload: form_id
  })
}

export const open_dialog = (dialog_id) => (dispatch) => {
  dispatch({
    type: FORM_EVENTS.OPEN_DIALOG,
    payload: { id: dialog_id }
  });
};

export const close_dialog = (dialog_id) => (dispatch) => {
  dispatch({
    type: FORM_EVENTS.CLOSE_DIALOG,
    payload: { id: dialog_id }
  });
};

export const set_dialog = (dialog_id, open) => (dispatch) => {
  dispatch({
    type: NAV_EVENTS.TOGGLE_DIALOG,
    payload: { dialog_id, open }
  });
}

export const update_date_range = (data) => (dispatch) => { dispatch({
  type: NAV_EVENTS.UPDATE_DATE_RANGE,
  payload: { date_range: data },
})};

const INITIAL_STATE = {
  api_ready: false,
  user_ready: false,
  account_ready: false,
  tabs: {
    manage_sales: 'jane',
    manage_items: 'shopify'
  },
  menus: { // set anchorElement
    account_menu: null,
  },
  connections: {},
  forms: {},
  dialogs: {
    mobile_open: false,
  },
  date_range: {
    active_date: moment().format('YYYY-MM-DD'),
    start_date: moment().format('YYYY-MM-DD'),
    end_date: moment().format('YYYY-MM-DD')
  }
};

//  = React.useState({
//   start_date: moment().subtract(1,'months').set('date', 1).format('YYYY-MM-DD'),
//   end_date: moment().subtract(1,'months').endOf('month').format('YYYY-MM-DD'),
// });
const add_day = (date) => moment(date).add(1, 'days').format('YYYY-MM-DD');

function reduce(state = INITIAL_STATE, action = {}) {
  const new_state = _.cloneDeep(state);
  let form_id, data;
  switch (action.type) {
    case FORM_EVENTS.OPEN_DIALOG:
      new_state.dialogs = {...new_state.dialogs, [action.payload.id]: true };
    break;
    case FORM_EVENTS.CLOSE_DIALOG:
      new_state.dialogs = {...new_state.dialogs, [action.payload.id]: false};
    break;
    case API_EVENT.CONNECTED:
      new_state.api_ready = true;
    break;
    case JANE_TRANSACTIONS.LOADED:
    case NAV_EVENTS.UPDATE_DATE_RANGE:
      new_state.date_range = action.payload.date_range;
      new_state.date_range.active_date = action.payload.date_range.start_date;
    break;
    case JANE_TRANSACTIONS.QB_TRANSACTION_SYNCED:
      const next_date = add_day(new_state.date_range.active_date);
      if (next_date <= new_state.date_range.end_date) {
        new_state.date_range.active_date = next_date;
      }
    break;
    case NAV_EVENTS.TAB_CHANGE:
      new_state.tabs[action.payload.section_id] = action.payload.tab_id;
    break;
    case NAV_EVENTS.TOGGLE_DIALOG:
      new_state.dialogs[action.payload.dialog_id] = action.payload.open;
    break;
    case API_EVENT.LOADING:
    case API_EVENT.LOADED:
    case API_EVENT.ERROR:
      new_state.connections = {...new_state.connections,
        [action.payload.service]: action.payload
      };
    break;
    case USER_EVENTS.LOGGED_IN:
      new_state.api_ready = true;
      new_state.user_ready = true;
      if (action.payload && action.payload.account) {
        new_state.account_ready = true;
      }
      new_state.dialogs = { ...new_state.dialogs, login: false };
    break;
    case USER_EVENTS.LOGGED_OUT:
    case USER_EVENTS.LOGIN_FAILURE:
      new_state.api_ready = true;
      new_state.user_ready = false;
      new_state.account_ready = false;
    break;
    case PASSWORD_EVENT.TOKEN_VALIDATED:
      new_state.forms = {...new_state.forms, password_reset: {email: action.payload.email}}
    break;
    case API_EVENT.CONNECTION_FAILED:
    new_state.api_ready = false;
    break;
    case FORM_EVENTS.UPDATE_FORM_VALUE:
      form_id = action.payload.form_id;
      new_state.forms = {...new_state.forms,
        [form_id]: { ...new_state.forms[form_id],
          [action.payload.field]: action.payload.value
        }
      }
    break;
    case FORM_EVENTS.UPDATE_FORM_VALUES:
      form_id = action.payload.form_id;
      data = action.payload.data;
      new_state.forms = { ...new_state.forms, [form_id]: data };
    break;
    case FORM_EVENTS.CLEAR_FORM_VALUES:
      delete new_state.forms[action.payload.form_id];
    break;

    default:;
  }
  return new_state;
}

export default function reduceWrapper(state, action) {
    var rv = reduce(state, action);
    return rv === state ? state : _.defaults(rv, state);
}
