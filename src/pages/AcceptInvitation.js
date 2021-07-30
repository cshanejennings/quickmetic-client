import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import {
  Paper,
  Typography,
  FormControl,
  Button,
  CircularProgress,
} from '@material-ui/core/';
import { Redirect } from 'react-router';

import { UserProps } from '../models/User';

import {
  PasswordField,
  TextInputField,
} from '../components/form-fields/';

import {
  api_verify_invite,
  api_accept_invite,
} from '../store/store.account';

const get_styles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(4),
  },
  main_heading: {
    margin: 10,
    display: 'block',
    width: '100%',
  },
  spinner: {
    marginRight: 20
  }
}));

const AcceptInvitation = (props) => {
  const classes = get_styles();
  const { api_ready, profile, verify_invite, accept_invite } = props;
  const token = props.match.params.token;

  const [verifying, set_verifying] = React.useState(false);
  const [invitation, set_invitation] = React.useState(null);

  if (api_ready && !verifying && !invitation) {
    verify_invite({token}).then((data) => set_invitation(data.payload)
      ).catch(e => console.error(e));
    set_verifying(true);
  }


  const [accepting, set_accepting] = React.useState(false);
  const [first_name, set_first_name] = React.useState('');
  const first_name_change = (first_name) => set_first_name(first_name);
  const [last_name, set_last_name] = React.useState('');
  const last_name_change = (last_name) => set_last_name(last_name);
  const [password, set_password] = React.useState('');
  const pw_change = (pw) => set_password(pw);

  const submit = () => {
    accept_invite({ first_name, last_name, password, token })
      .catch(e => console.error(e))
    set_accepting(true);
  }

  if (profile.email) return <Redirect to='/account' />;
  const err = '';

  return (invitation) ? (
    <Paper className={classes.paper}>
      <Typography className={ classes.main_heading } variant="h5">Create your account.</Typography>
      <TextInputField
        label="First Name"
        disabled={ accepting }
        error_msg={ err }
        value={ first_name }
        on_change={ first_name_change }
      />
      <TextInputField
        label="Last Name"
        disabled={ accepting }
        error_msg={ err }
        value={ last_name }
        on_change={ last_name_change }
      />
      <TextInputField
        label="Email"
        disabled={ true }
        error_msg=''
        on_change={ ()=>{} }
        value={ invitation.email }
      />
      <PasswordField
        disabled={ accepting }
        error_msg={ err }
        value={ password }
        on_change={ pw_change }
      />
      <FormControl fullWidth className={ classes.margin }>
        <Button disabled={ accepting } color="primary" variant="contained" onClick={ submit }>
          Create Account
        </Button>
      </FormControl>
    </Paper>
  ) : (
    <Paper className={classes.paper}>
      <Typography variant="h5">
        <CircularProgress size={24} className={ classes.spinner }/>Checking Invitation
      </Typography>
    </Paper>
  );
}

AcceptInvitation.propTypes = {
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
  verify_invite: (data) => api_verify_invite(dispatch, data),
  accept_invite: (data) => api_accept_invite(dispatch, data),
} };

export default connect( mapStateToProps, mapDispatchToProps )(AcceptInvitation);
