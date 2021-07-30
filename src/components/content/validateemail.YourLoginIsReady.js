import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  Button,
} from '@material-ui/core/';

import {
  Alert,
  // AlertTitle,
} from '@material-ui/lab/';

import ContentWrapper from '../ContentWrapper';
import SignupStepper from '../SignupStepper';

import {
  Person,
  Lock,
} from '@material-ui/icons/';

const get_styles = makeStyles(theme => ({
  instruction: {
    margin: 32,
    padding: '5px 15px',
  },
  login_icon: {
    marginRight: 8
  }
}));

const YourLoginIsReady = (props) => {
  const classes = get_styles();
  const { login } = props;
    return (
      <ContentWrapper icon={ <Person /> } heading="Your login is ready!">
      <SignupStepper current_step={ 2 }/>
        <Alert severity="success">
          Your email has been verified! Please login using your user name and password.
        </Alert>
        <Button
          className={ classes.instruction }
          variant="outlined"
          size="small"
          onClick={ login }
          component={ Link } to="/account"
        >
          <Lock className={ classes.login_icon }/>
          Click here to log in
        </Button>
      </ContentWrapper>
    );
}


YourLoginIsReady.propTypes = {
  login: PropTypes.func.isRequired,
}

export default YourLoginIsReady;
