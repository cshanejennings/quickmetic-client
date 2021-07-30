import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import {
  Paper,
  Typography,
} from '@material-ui/core/';

import { api_auth_google_callback } from '../store/store.user.login';
import { UserProps } from '../models/User';
import { SubscriptionProps } from '../models/Subscription';

const CONNECTION = { initialized: false };
const get_styles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(4),
  },
}));

const LoginGoogle = (props) => {
  const classes = get_styles();
  const { get_google_profile, profile, api_ready } = props;

  const params = window.location.search;
  if (params && api_ready && !CONNECTION.initialized) {
    CONNECTION.initialized = true;
    get_google_profile(params);
  }

  if (profile.email) {
    return <Redirect to={'/trial'} />;
  } else if (profile.email) {
    return <Redirect to={'/account'} />;
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">Login to google</Typography>
    </Paper>
  );
}

LoginGoogle.propTypes = {
  api_ready: PropTypes.bool.isRequired,
  profile: UserProps,
  subscription: SubscriptionProps,
};

const mapStateToProps = state => { return {
  api_ready: state.app.api_ready,
  profile: state.user.profile,
  subscription: state.account.subscription,
} };

const mapDispatchToProps = dispatch => { return {
  get_google_profile: (params) => dispatch(api_auth_google_callback(params)),
} };

export default connect( mapStateToProps, mapDispatchToProps )(LoginGoogle);
