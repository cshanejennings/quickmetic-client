import { combineReducers } from 'redux';

import app from './store.app';
import user from './store.user';
import account from './store.account';
import trial from './store.trial';
import reports from './store.reports';

export {
  app,
  user,
  account,
  trial,
  reports,
};

export default combineReducers({
  app,
  user,
  account,
  trial,
  reports,
});
