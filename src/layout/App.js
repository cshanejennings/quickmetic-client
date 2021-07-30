import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { connect } from 'react-redux';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import Home from '../pages/Home';
import AccountSettings from '../pages/AccountSettings';
import Registration from '../pages/Registration';
import AcceptInvitation from '../pages/AcceptInvitation';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import ValidateEmail from '../pages/ValidateEmail';
import LoginGoogle from '../pages/LoginGoogle';
import Pricing from '../pages/Pricing';
import Help from '../pages/Help';
import TrialPage from '../pages/TrialPage';
import ReportPage from '../pages/ReportPage';


import WireFrame from './WireFrame';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import root_reducer from 'store/';
import ReduxThunk from 'redux-thunk';
import './App.css';

import { initialize } from '../store/store.app';
let INITIAL_STATE = {};

const store = (process.env.NODE_ENV === "development")
  ? createStore( root_reducer, INITIAL_STATE,
    composeWithDevTools(applyMiddleware(ReduxThunk)))
  : createStore( root_reducer, INITIAL_STATE, applyMiddleware(ReduxThunk));

store.dispatch(initialize());

const get_styles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100vh',
  }
}));

const App = (props) => {
  const classes = get_styles();
  return (
    <Provider store={store}>
      <Router>
        <div  className={classes.root}>
          <WireFrame>
            <Switch>
              <Route path="/" exact component={ Home } />
              <Route path="/trial" exact component={ TrialPage } />
              <Route path="/reports" exact component={ ReportPage } />
              <Route path="/register" exact component={ Registration } />
              <Route path="/pricing" exact component={ Pricing } />
              <Route path="/help" exact component={ Help } />
              <Route path="/forgot-password/" component={ ForgotPassword } />
              <Route path="/reset-password/:token" component={ ResetPassword } />
              <Route path="/reset-password/" component={ ResetPassword } />
              <Route path="/validate-email/:url" component={ ValidateEmail } />
              <Route path="/google-login/" component={ LoginGoogle } />
              <Route path="/account" exact component={ AccountSettings } />
              <Route path="/accept-invite/:token" exact component={ AcceptInvitation } />
            </Switch>
          </WireFrame>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
