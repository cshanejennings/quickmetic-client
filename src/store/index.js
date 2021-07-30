import { combineReducers } from 'redux';

import app from './store.app';
import user from './store.user';
import account from './store.account';
import trial from './store.trial';

export {
  app,
  user,
  account,
  trial,
};

export default combineReducers({
  app,
  user,
  account,
  trial,
});
