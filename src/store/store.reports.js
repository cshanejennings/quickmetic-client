import _ from 'lodash';

import {
  get_all_trials,
} from '../util/laravel-api';

import {
  parse_reports,
  add_report,
} from '../util/report-parsing';

import {
  USER_EVENTS,
  TRIAL_EVENTS,
  REPORT_EVENTS,
} from './events';

export const load_trials = () => (dispatch) => {
  const { RECORDS_LOADING, RECORDS_LOADED } = REPORT_EVENTS;
  dispatch({type: RECORDS_LOADING});
  get_all_trials().then(response => {
    dispatch({
      type: RECORDS_LOADED,
      payload: parse_reports(response.data)
    })
  }).catch(e => { console.error(e); });
}

const INITIAL_STATE = {
  records_loading: false,
  records_loaded: false,
  selected_type: 'addition',
  reports: {
    addition: [],
    subtraction: [],
    multiplication: [],
    division: []
  }
};

function reduce(state = INITIAL_STATE, action = {}) {
  const new_state = _.cloneDeep(state);
  switch (action.type) {
    // case USER_EVENTS.LOGIN_FAILURE: break;
    case USER_EVENTS.LOGGED_IN:
      new_state.records_loading = false;
      new_state.records_loaded = false;
      new_state.reports = { ...INITIAL_STATE.reports };
    break;
    case REPORT_EVENTS.RECORDS_LOADING:
      new_state.records_loading = true;
      new_state.records_loaded = false;
      new_state.reports = { ...INITIAL_STATE.reports };
    break;
    case REPORT_EVENTS.RECORDS_LOADED:
      new_state.records_loading = false;
      new_state.records_loaded = true;
      new_state.reports = action.payload;
    break;
    case TRIAL_EVENTS.TRIAL_SUBMITTED:
      new_state.reports = add_report(new_state.reports, action.payload);
    break;
    default:;
  }
  return new_state;
}

export default function reduceWrapper(state, action) {
    var rv = reduce(state, action);
    return rv === state ? state : _.defaults(rv, state);
}
