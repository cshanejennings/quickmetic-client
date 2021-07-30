import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { api_register_new_user } from '../store/store.user.registration';

import { Redirect } from 'react-router';
import { UserProps } from '../models/User';

import CheckYourInbox from '../components/content/registration.CheckYourInbox';
import CreateProfile from '../components/forms/registration.CreateProfile';

const RegistrationPage = (props) => {
  const { register, profile } = props;
  const [success, set_success] = React.useState(false);
  const handle_success = () => set_success(true);

  return (profile.email && profile.email_verified_at)
    ? <Redirect to='/account' />
    : (success)
      ? <CheckYourInbox />
      : <CreateProfile update={ register } handle_success={ handle_success }/>;
}

RegistrationPage.propTypes = {
  api_ready: PropTypes.bool.isRequired,
  profile: UserProps,
};

const mapStateToProps = state => { return {
  api_ready: state.app.api_ready,
  profile: state.user.profile,
} };

const mapDispatchToProps = dispatch => { return {
  register: (data) => api_register_new_user(dispatch, data),
} };

export default connect( mapStateToProps, mapDispatchToProps )(RegistrationPage);
