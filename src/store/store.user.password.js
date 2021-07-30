import {
  make_api_request,
  forgot_password,
  validate_password_reset_token,
  reset_password,
} from '../util/laravel-api';

import { get_logger } from '../util/logger';

import { PASSWORD_EVENT, USER_EVENTS } from './events';

const trace = get_logger('STORE_USER');

export const api_submit_forgot_password = (dispatch, data) => {
  trace.log('submit_forgot_password called');
  const { RESET_REQUEST_SENT, RESET_REQUEST_FAILED } = PASSWORD_EVENT;
  make_api_request(dispatch, { service: 'api_submit_forgot_password' },
    forgot_password(data).then(response => dispatch({ type: RESET_REQUEST_SENT, payload: {
      msg: response.data.message
    }})).catch(e => { dispatch({ type: RESET_REQUEST_FAILED});
    throw(Error(e.response.data.error));
  }));
}

export const api_check_pw_validation_token = (dispatch, data) => {
  const { TOKEN_VALIDATED, TOKEN_INVALID } = PASSWORD_EVENT;
  trace.log('check_pw_validation_token called');
  make_api_request(dispatch, { service: 'api_check_pw_validation_token' },
    validate_password_reset_token(data).then(response => dispatch({ type: TOKEN_VALIDATED, payload: {
      msg: `You have ${Math.round(response.data.remaining / 60)} minutes to reset your password`,
      email: response.data.email,
    }})).catch(e => { dispatch({ type: TOKEN_INVALID});
    throw(Error(e.response.data.error));
  }));
}

export const api_submit_reset_password = (dispatch, data) => {
  const { PASSWORD_RESET_FAILED } = PASSWORD_EVENT;
  const { LOGGED_IN } = USER_EVENTS;
  trace.log('submit_reset_password called');
  make_api_request(dispatch, { service: 'api_submit_reset_password' },
    reset_password(data).then(response => dispatch({ type: LOGGED_IN, payload:
      response.data
    })).catch(e => { dispatch({ type: PASSWORD_RESET_FAILED});
    debugger;
    throw(Error(e.response.data.error));
  }));
}
