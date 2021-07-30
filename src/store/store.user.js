import _ from 'lodash';
import {
  make_api_request,
  get_user_profile,
  update_profile,
} from '../util/laravel-api';

import {
  USER_EVENTS,
  ACCOUNT_EVENTS,
  PASSWORD_EVENT,
  REGISTRATION_EVENT,
} from './events';

import { get_logger } from '../util/logger';

import {
  create_user_model,
  user_store_initial_state,
  users_store_initial_state,
} from '../models/User';

const trace = get_logger('STORE_USER');

export const api_get_user_profile = () => (dispatch) => {
  const { LOGGED_IN, LOGGED_OUT } = USER_EVENTS;
  get_user_profile().then(response => { dispatch({
    type: LOGGED_IN,
    payload: create_user_model(response.data)
  })}).catch(e => { return dispatch({ type: LOGGED_OUT,
      payload: { msg: 'Not logged in' }
  })});
}

export const api_update_user_profile = (dispatch, data) => {
  const { UPDATED, LOGIN_FAILURE } = USER_EVENTS;
  trace.log('update_user_profile called');
  make_api_request(dispatch, { service: 'api_update_user_profile' },
    update_profile(data).then(response => dispatch({ type: UPDATED, payload:
      create_user_model(response.data)
    })).catch(e => { dispatch({ type: LOGIN_FAILURE, payload: {
      msg: 'The server disconnected, please log in again.'
    }});
    throw(Error('The server disconnected, please log in again.'));
  }));
}

export const queue_user = (data, dispatch, queue = []) => {
  trace.log('queue_user called');
  // TODO: put some connection checking in here to
  // change the loader message if it's not working
  if (!data.profile.email && !queue.length) {
    queue.push('Connecting to Server...');
  }
  return queue;
}

const INITIAL_STATE = {
  profile: { ...user_store_initial_state },
  users: [...users_store_initial_state],
  connections: {},
};

function reduce(state = INITIAL_STATE, action = {}) {
  const new_state = _.cloneDeep(state);
  switch (action.type) {
    case USER_EVENTS.LOGIN_FAILURE:
    case REGISTRATION_EVENT.FAILURE:
      window.localStorage.logged_in = false;
      new_state.profile = {...INITIAL_STATE.profile }
    break;
    case USER_EVENTS.LOGGED_IN:
    case USER_EVENTS.UPDATED:
      window.localStorage.logged_in = true;
      new_state.profile = action.payload;
    break;
    case ACCOUNT_EVENTS.USERS_LOADING:
      new_state.users = [];
    break;
    case ACCOUNT_EVENTS.USERS_LOADED:
    case REGISTRATION_EVENT.INVITED:
      new_state.users = action.payload;
    break;
    case USER_EVENTS.LOGGED_OUT:
      new_state.profile = {...INITIAL_STATE.profile};
    break;
    case PASSWORD_EVENT.TOKEN_VALIDATED:
      new_state.profile.email = action.payload.email;
    break;
    // case API_EVENT.CONNECTED: break;
    // case USER_EVENTS.LOGGING_IN: break;
    // case REGISTRATION_EVENT.COMPLETE: break;
    // case REGISTRATION_EVENT.EMAIL_VALIDATED: break;
    // case PASSWORD_EVENT.RESET_REQUEST_SENT: break;
    // case PASSWORD_EVENT.RESET_REQUEST_FAILED: break;
    // case PASSWORD_EVENT.TOKEN_INVALID: break;
    // case PASSWORD_EVENT.RESETTING_PASSWORD: break;
    // case PASSWORD_EVENT.PASSWORD_RESET_FAILED: break;
    // case OAUTH_EVENTS.GOOGLE_REDIRECTING: break;
    default:
  }
  return new_state;
}

export default function reduceWrapper(state, action) {
    var rv = reduce(state, action);
    return rv === state ? state : _.defaults(rv, state);
}
