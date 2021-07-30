import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import { API_EVENT } from '../store/events';

export const local_time = (str) => {
  return new Date(moment.utc(str).local().toDate().getTime());
};

export const make_api_request = (dispatch, data={}, promise) => {
  const t = () => new Date().getTime();
  const def = {
      service: data.service,
      state: data.state || 'loading',
      start_time: t(),
      timeout: data.service || 2000,
  };
  setTimeout(()=> dispatch({ type: API_EVENT.LOADING, payload: { ...def }}), 0);
  return promise.then(resp=> setTimeout(()=> dispatch({ type: API_EVENT.LOADED, payload: {
    ...def,
    state: 'loaded',
    msg: _.get(resp, 'payload.msg', '')
  }}), 0)).catch(e => setTimeout(()=> dispatch({ type: API_EVENT.ERROR, payload: {
    ...def,
    state: 'error',
    err: e.message,
  }}), 0));
}

export const URI_BASE = process.env.REACT_APP_MATH_DASHBOARD_SERVER;
// export const URI_BASE = 'http://math.local';

const srvr = axios.create({
  baseURL: URI_BASE,
  withCredentials: true,
  // https://github.com/axios/axios/issues/647
  timeout: 2400000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})

const API = {
  get_csrf_token: () => `${URI_BASE}/sanctum/csrf-cookie`,
  register: () => `${URI_BASE}/api/register`,
  forgot_password: () => `${URI_BASE}/api/forgot-password`,
  reset_password: (token) => `${URI_BASE}/api/reset-password/${token}`,
  login: () => `${URI_BASE}/api/login`,
  invite: () => `${URI_BASE}/api/account/invite-user`,
  resend_invite: () => `${URI_BASE}/api/account/resend-invite`,
  delete_invite: () => `${URI_BASE}/api/account/delete-invite`,
  verify_invite: () => `${URI_BASE}/api/account/verify-invite`,
  accept_invite: () => `${URI_BASE}/api/account/accept-invite`,

  get_all_trials: () => `${URI_BASE}/api/trial/get-all-trials`,
  submit_trial_results: () => `${URI_BASE}/api/trial/submit-trial-results`,

  auth_google_url: () => `${URI_BASE}/api/auth/google/url`,
  auth_google_callback: (params) => `${URI_BASE}/api/auth/google/callback${params}`,

  logout: () => `${URI_BASE}/api/logout`,
  user: () => `${URI_BASE}/api/user`,
  update_profile: () => `${URI_BASE}/api/user`,
  // update_email: () => `${URI_BASE}/api/user/email`,
  // update_password: () => `${URI_BASE}/api/user/password`,
  update_account: () => `${URI_BASE}/api/account`,
  onboarding_schedule: () => `${URI_BASE}/api/onboarding/schedule`,
  account_users: () => `${URI_BASE}/api/account/users`,
};

export const test_api = (data={}) => srvr.post(API.test_api(), data);

export const get_csrf_token = () => srvr.get(API.get_csrf_token());

export const login = (data) => srvr.post(API.login(), data);
export const register_user = (data) => srvr.post(API.register(), data);

export const invite_user = (data) => srvr.post(API.invite(), data);
export const delete_invite = (data) => srvr.post(API.delete_invite(), data);
export const resend_invite = (data) => srvr.post(API.resend_invite(), data);
export const verify_invite = (data) => srvr.post(API.verify_invite(), data);
export const accept_invite = (data) => srvr.post(API.accept_invite(), data);

export const get_all_trials = (data) => srvr.post(API.get_all_trials(), data);
export const submit_trial_results = (data) => srvr.post(API.submit_trial_results(), data);

export const validate_email = (url) => srvr.get(url.replace(URI_BASE, ''));
export const auth_google_url = () => srvr.get(API.auth_google_url());
export const auth_google_callback = (params) => srvr.get(API.auth_google_callback(params));

export const forgot_password = (data) => srvr.post(API.forgot_password(), data);
export const validate_password_reset_token = (token) => srvr.get(API.reset_password(token));
export const reset_password = (data) => srvr.post(API.reset_password(data.token), data);

export const logout = () => srvr.post(API.logout());

export const get_user_profile = () => srvr.get(API.user());
export const account_users = () => srvr.get(API.account_users());
export const update_profile = (data) => srvr.post(API.update_profile(), data);
export const update_account = (data) => srvr.post(API.update_account(), data);
export const onboarding_schedule = (data) => srvr.post(API.onboarding_schedule(), data);
