import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import {
  Paper,
  Typography,
  FormControl,
  Button
} from '@material-ui/core/';
import { Redirect } from 'react-router';

import { UserProps } from '../models/User';
import { TextInputField } from '../components/form-fields/';
import { api_submit_forgot_password } from '../store/store.user.password';

const get_styles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(4),
  },
}));

const ForgotPassword = (props) => {
  const classes = get_styles();
  const [email, set_email] = React.useState('');

  const { connection, profile } = props;
  const { msg, err, state } = connection;

  const { submit  } = props;

  const user_change = (email) => set_email(email);

  const disabled = (state === 'loading') ? true : false;

  if (profile.email) return <Redirect to='/account' />;

  const error_prompt = (err) ? (
    <Typography align="center" variant="subtitle2" className={ classes.err }>
      { err }
    </Typography>
  ) : "";
  const send_request = () => submit(email);

  return (msg) ? (
    <div>{ msg }</div>
  ): (
    <Paper className={classes.paper}>
      <Typography variant="h5">Request a password reset.</Typography>
      { error_prompt }
      <TextInputField
        label={ "Account Email" }
        disabled={ disabled }
        error_msg={ err }
        on_change={ user_change }
        value={ email }
      />
      <FormControl fullWidth className={classes.margin}>
        <Button disabled={ disabled } color="primary" variant="contained" onClick={ send_request }>
          Get Password Reset Email
        </Button>
      </FormControl>
    </Paper>
  );
}

ForgotPassword.propTypes = {
  api_ready: PropTypes.bool.isRequired,
  connection: PropTypes.object.isRequired,
  profile: UserProps,
};

const mapStateToProps = state => { return {
  api_ready: state.app.api_ready,
  connection: state.app.connections.api_submit_forgot_password || {},
  profile: state.user.profile,
} };

const mapDispatchToProps = dispatch => { return {
  submit: (email) => api_submit_forgot_password(dispatch, { email }),
} };

export default connect( mapStateToProps, mapDispatchToProps )(ForgotPassword);
