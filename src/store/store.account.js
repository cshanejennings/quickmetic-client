import _ from 'lodash';
import {
  update_account,
  onboarding_schedule,
  account_users,
  invite_user,
  resend_invite,
  delete_invite,
  verify_invite,
  accept_invite,
} from '../util/laravel-api';

import { get_logger } from '../util/logger';

import {
  create_account_model,
  account_store_initial_state,
} from '../models/Account';

import {
  create_subscription_model,
  subscription_store_initial_state,
} from '../models/Subscription';

import {
  create_plan_model,
  plan_store_initial_state,
} from '../models/Plan';

import { create_user_model } from '../models/User';
import { create_invitation_model } from '../models/Invitation';

import {
  USER_EVENTS,
  ACCOUNT_EVENTS,
  REGISTRATION_EVENT,
  INVITATION_EVENTS,
} from './events';

const trace = get_logger('STORE_USER');
const { LOGIN_FAILURE } = USER_EVENTS;

export const api_onboarding_schedule = (dispatch, data) => {
  const { SCHEDULE_ONBOARDING } = REGISTRATION_EVENT;
  return onboarding_schedule(data).then(response => dispatch({ type: SCHEDULE_ONBOARDING, payload:
      response.data
  })).catch(e => {
      throw(Error(JSON.stringify(e.response.data.errors)));
  });
}


export const api_invite_new_user = (dispatch, data) => { // Test me
  const { INVITED } = REGISTRATION_EVENT;
  return invite_user(data).then(response => dispatch({ type: INVITED, payload:
      response.data
  })).catch(e => {
      throw(Error(JSON.stringify(e.response.data.errors)));
  });
}

export const api_resend_user_invite = (dispatch, data) => { // Test me
  const { INVITED } = REGISTRATION_EVENT;
  return resend_invite(data).then(response => dispatch({ type: INVITED, payload:
      response.data
  })).catch(e => {
      throw(Error(JSON.stringify(e.response.data.errors)));
  });
}

export const api_delete_user_invite = (dispatch, data) => { // Test me
  const { INVITED } = REGISTRATION_EVENT;
  return delete_invite(data).then(response => dispatch({ type: INVITED, payload:
      response.data
  })).catch(e => {
      throw(Error(JSON.stringify(e.response.data.errors)));
  });
}

export const api_verify_invite = (dispatch, data) => { // Test me
  const { INVITED } = INVITATION_EVENTS;
  return verify_invite(data).then(response => dispatch({ type: INVITED, payload:
      response.data
  })).catch(e => {
    debugger;
      throw(Error(JSON.stringify(e.response.data.errors)));
  });
}

export const api_accept_invite = (dispatch, data) => { // Test me
  const { LOGGED_IN } = USER_EVENTS;
  return accept_invite(data).then(response => dispatch({ type: LOGGED_IN, payload:
      response.data
  }));
}

export const api_update_user_account = (dispatch, data) => {
  const { UPDATED } = USER_EVENTS;
  return update_account(data).then(response => dispatch({ type: UPDATED, payload:
      response.data
    })).catch(e => {  // TODO: Add error failure types
    dispatch({ type: LOGIN_FAILURE, payload: {
      msg: 'The server disconnected, please log in again.'
    }});
    throw(Error('The server disconnected, please log in again.'));
  });
}

export const api_get_account_users = (dispatch) => {
  const { USERS_LOADED } = ACCOUNT_EVENTS;
  return account_users().then(response => dispatch({ type: USERS_LOADED, payload:
      response.data
    })).catch(e => {  // TODO: Add error failure types
    dispatch({ type: LOGIN_FAILURE, payload: {
      msg: 'The server disconnected, please log in again.'
    }});
    throw(Error('The server disconnected, please log in again.'));
  });
}

//TODO: Revist the data.account_data.id scenario where a user might not
// have an account yet
export const queue_users = (dispatch, data, queue = []) => {
  trace.log('queue_users called');
  const account_status = _.get(data.connections, 'api_get_account_users.state');
  if (!data.profile.email && !queue.length) {
    queue.push('Connecting to Server...');
  } else if (!data.users.length && data.account_data.id) {
    if (!account_status) {
      api_get_account_users(dispatch);
    }
    queue.push('Loading users on this account...');
  }
  return queue;
}

const INITIAL_STATE = {
  data: account_store_initial_state,
  subscription: subscription_store_initial_state,
  plan: plan_store_initial_state,
  users: [],
  invitations: [],
};

function reduce(state = INITIAL_STATE, action = {}) {
  const new_state = _.cloneDeep(state);
  switch (action.type) {
    case USER_EVENTS.UPDATED:
    case USER_EVENTS.LOGGED_IN:
    case REGISTRATION_EVENT.SCHEDULE_ONBOARDING:
      new_state.data = ( action.payload.account )
        ? create_account_model(action.payload.account) : { ...INITIAL_STATE.data };
      new_state.subscription = ( action.payload.subscription )
        ? create_subscription_model(action.payload.subscription) : { ...INITIAL_STATE.subscription };
      new_state.plan = ( action.payload.plan )
        ? create_plan_model(action.payload.plan) : { ...INITIAL_STATE.plan };
    break;
    case REGISTRATION_EVENT.INVITED:
    case ACCOUNT_EVENTS.USERS_LOADED:
      new_state.users = action.payload.users.map(create_user_model);
      new_state.invitations = action.payload.invitations.map(create_invitation_model);
    break;
    case USER_EVENTS.LOGIN_FAILURE:
    case USER_EVENTS.LOGGED_OUT:
      return { ...INITIAL_STATE };
    default:
  }
  return new_state;
}

export default function reduceWrapper(state, action) {
    var rv = reduce(state, action);
    return rv === state ? state : _.defaults(rv, state);
}
