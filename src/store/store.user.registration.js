import {
  register_user,
  validate_email,
  make_api_request,
} from '../util/laravel-api';

import { get_logger } from '../util/logger';

import { REGISTRATION_EVENT } from './events';

const trace = get_logger('STORE_USER');

export const api_register_new_user = (dispatch, data) => { // Test me
  const { COMPLETE, FAILURE } = REGISTRATION_EVENT;
  trace.log('register_new_user called');
  return make_api_request(dispatch, { service: 'api_register_new_user' },
    register_user(data).then(response => dispatch({ type: COMPLETE, payload: {
      msg: response.data.message
    }})).catch(e => { dispatch({ type: FAILURE, payload: e.response.data.errors });
      throw(Error(e.response.data.errors.email[0]));
  }));
}

export const api_validate_email = (dispatch, url) => { // Test me
  const { EMAIL_VALIDATED } = REGISTRATION_EVENT;
  trace.log('api_validate_email called');
  return validate_email(url).then(response => dispatch({ type: EMAIL_VALIDATED, payload: {
    success: response.data.success
  }})).catch(e => {
    throw(Error(e.response.data));
  });
}
