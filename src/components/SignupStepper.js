import React from 'react';
import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';

import {
  Stepper,
  Step,
  StepLabel
} from '@material-ui/core/';

// const get_styles = makeStyles(theme => ({
//   root: {}
// }));

const SignupStepper = (props) => {
  // const classes = get_styles();
  const { current_step } = props;

    return (
      <Stepper activeStep={ current_step } alternativeLabel>
        <Step>
          <StepLabel>Create your login</StepLabel>
        </Step>
        <Step>
          <StepLabel>Verify Your Email</StepLabel>
        </Step>
        <Step>
          <StepLabel>Schedule a call</StepLabel>
        </Step>
      </Stepper>
    );
}

SignupStepper.defaultProps = {
  current_step: '',
}

SignupStepper.propTypes = {
  current_step: PropTypes.number.isRequired,
}

export default SignupStepper;
