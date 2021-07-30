import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import {
  Paper,
  Typography,
} from '@material-ui/core/';

import { open_dialog } from '../store/store.app';
import { api_validate_email } from '../store/store.user.registration';

import { UserProps } from '../models/User';
import { SubscriptionProps } from '../models/Subscription';

import YourLoginIsReady from '../components/content/validateemail.YourLoginIsReady';

const get_styles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(4),
    justifyContent: 'center',
    textAlign: 'center',
  },
  main_heading: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: 'block',
    width: '100%',
  },
  login: {
    margin: '16px auto'
  },

  error_msg: {
    width: '90%',
    margin: '0 auto 20px auto',
    color: '#990000',
  },
}));

const ValidateEmail = (props) => {
  const classes = get_styles();

  const { api_ready, open_login, profile, validate_email } = props;
  const [validating, set_validating] = React.useState(false);
  const [validated, set_validated] = React.useState(false);
  const [error, set_error] = React.useState('');

  const url = atob(props.match.params.url || '');

  if (api_ready && url && !validating && !validated && !error) {
    validate_email(url).then((resp) => {
      if (resp.payload.success) {
        set_validated(true);
      }

    }).catch( err => {
      set_error(err.toString());
    });
    set_validating(true);
  }

  if (profile.email && profile.email_verified_at) {
    return <Redirect to={'/account'} />;
  }

  return (validated) ? (
    <YourLoginIsReady login={ open_login }/>
  ) : (error) ? (
    <Paper className={classes.paper}>
      <Typography className={ classes.error_msg }>{error}</Typography>
    </Paper>
  ) : (
    <Paper className={classes.paper}>
      <Typography variant="h5">Validate Email</Typography>
    </Paper>
  );
}

ValidateEmail.propTypes = {
  api_ready: PropTypes.bool.isRequired,
  profile: UserProps,
  subscription: SubscriptionProps,
};

const mapStateToProps = state => { return {
  api_ready: state.app.api_ready,
  profile: state.user.profile,
  subscription: state.subscription,
} };

const mapDispatchToProps = dispatch => { return {
  validate_email: (url) => api_validate_email(dispatch, url),
  open_login: () => dispatch(open_dialog('login')),
} };

export default connect( mapStateToProps, mapDispatchToProps )(ValidateEmail);
