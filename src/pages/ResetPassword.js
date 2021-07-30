import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Paper,
  Typography,
  FormControl,
  Button
} from '@material-ui/core/';
import { Redirect } from 'react-router';

import { UserProps } from '../models/User';
import { PasswordField } from '../components/form-fields/';
import {
  api_check_pw_validation_token,
  api_submit_reset_password,
} from '../store/store.user.password';

const get_styles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(4),
  },
  option_buttons: {
    margin: theme.spacing(1),
  }
}));

const ResetPassword = (props) => {
  const classes = get_styles();
  const [password, set_password] = React.useState('');

  const { tkn_connection, reset_connection, profile, api_ready, form } = props;
  const { msg, err, state } = tkn_connection;

  const { check, submit } = props
  const { email } = form;

  if (profile.id) return <Redirect to='/account' />;

  const token = props.match.params.token;
  if (!token) return <Redirect to='/forgot-password' />;

  const pw_change = (password) => set_password(password);

  const error_prompt = (err) ? (
    <div>
      <Typography align="center" variant="subtitle2" className={ classes.error_msg }>
        { err }
      </Typography>
      <div>
        <Button className={ classes.option_buttons } variant="contained" color="primary" component={Link} to={'/forgot-password'}>Send another password reset</Button>
        <Button className={ classes.option_buttons } variant="contained" color="primary" component={Link} to={'/'}>Go to Login</Button>
      </div>
    </div>
  ) : "";

  if (api_ready && !email && !err && !state) {
    check(token);
    return <div>Checking Token</div>;
  }

  const send_request = () => submit(email, token, password);

  const disabled = (reset_connection.state && reset_connection.state !== "error") ? true : false;


  return (err) ? (
    <Paper className={classes.paper}>
      { error_prompt }
    </Paper>
  ) : (
    <Paper className={classes.paper}>
      <Typography variant="h6">Request a password reset for { email }</Typography>
      <div>{ msg }</div>
      <PasswordField
        disabled={ disabled }
        error_msg={ err || '' }
        on_change={ pw_change }
        value={ password }
      />
      <FormControl fullWidth className={classes.margin}>
        <Button disabled={ disabled } color="primary" variant="contained" onClick={ send_request }>
          Update Password
        </Button>
      </FormControl>
    </Paper>
  );
}

ResetPassword.propTypes = {
  api_ready: PropTypes.bool.isRequired,
  tkn_connection: PropTypes.object.isRequired,
  reset_connection: PropTypes.object.isRequired,
  profile: UserProps,
};

const mapStateToProps = state => { return {
  api_ready: state.app.api_ready,
  form: state.app.forms.password_reset || {},
  tkn_connection: state.app.connections.api_check_pw_validation_token || {},
  reset_connection: state.app.connections.api_submit_reset_password || {},
  profile: state.user.profile,
} };

const mapDispatchToProps = dispatch => { return {
  check: (token) => api_check_pw_validation_token(dispatch, token),
  submit: (email, token, password) => api_submit_reset_password(dispatch, { email, token, password }),
} };

export default connect( mapStateToProps, mapDispatchToProps )(ResetPassword);
