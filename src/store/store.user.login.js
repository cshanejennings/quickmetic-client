import {
  make_api_request,
  login,
  auth_google_url,
  auth_google_callback,
  logout,
} from '../util/laravel-api';

import { get_logger } from '../util/logger';

import {
  USER_EVENTS,
  OAUTH_EVENTS,
} from './events';

const trace = get_logger('STORE_USER');

// data = {email, password}
export const api_server_login = (data) => (dispatch) => {
  trace.log('api_server_login called');
  const { LOGGED_IN, LOGIN_FAILURE } = USER_EVENTS;
  make_api_request(dispatch, { service: 'api_server_login' },
    login(data).then(response => dispatch({ type: LOGGED_IN, payload:
      response.data
    })).catch(e => { dispatch({ type: LOGIN_FAILURE});
    throw(Error('The user / password combination you used does not exist.'));
  }));
}

export const api_auth_google_url = () => (dispatch) => {
  trace.log('api_auth_google_url called');
  const { GOOGLE_REDIRECTING } = OAUTH_EVENTS;
  const { LOGIN_FAILURE } = USER_EVENTS;
  make_api_request(dispatch, { service: 'api_auth_google_url' },
    auth_google_url().then(response => { console.log({response}); return dispatch({ type: GOOGLE_REDIRECTING, payload: {
      msg: response.data.url
    }})}).catch(e => { dispatch({ type: LOGIN_FAILURE});
    throw(Error('Could not establish connection with server.'));
  }));
}

export const api_auth_google_callback = (data) => (dispatch) => {
  trace.log('api_auth_google_callback called');
  const { LOGGED_IN, LOGIN_FAILURE } = USER_EVENTS;
  make_api_request(dispatch, { service: 'api_auth_google_callback' },
    auth_google_callback(data).then(response => dispatch({ type: LOGGED_IN, payload:
      response.data
    })).catch(e => { dispatch({ type: LOGIN_FAILURE});
    trace.error(e.response.data.message, e);
    throw(Error('Could not establish connection with google'));
  }));
}

export const api_server_logout = () => (dispatch) => {
  const { LOGGED_OUT } = USER_EVENTS;
  trace.log('server_logout called');
  logout().then(resp => dispatch({ type: LOGGED_OUT
  })).catch( e => { console.error(e); return dispatch({
    type: LOGGED_OUT
  })});
}
