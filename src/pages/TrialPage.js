import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import {
  // Paper,
  Typography,
  Divider,
  Button,
} from '@material-ui/core/';

import Trial from '../components/trial';
import TrialSelector from '../components/trial-selector';

import {
  create_trial,
  load_trials,
} from '../store/store.trial';

const get_styles = makeStyles(theme => ({
}));

const TrialPage = (props) => {
  const classes = get_styles();

  const {
    trial,
    // get_trial,
    load_trials,
  } = props;

  const { row_values, row_digits, header_digits } = trial.data;
  const display_trial = () => {
    return (row_values.length) ? <Trial /> : <TrialSelector />;
  }

  const onload = () => {
    load_trials();
  }


  return (
    <div>
      <Typography variant="h5">Addition { row_digits } by { header_digits }</Typography>
      <Button onClick={onload}>load</Button>
      <Divider className={ classes.divider }/>
      { display_trial() }
    </div>
  );
}

const mapStateToProps = state => { return {
  trial: state.trial,
} };

const mapDispatchToProps = (dispatch) => { return {
  get_trial: (data) => dispatch(create_trial(data)),
  load_trials: (data) => dispatch(load_trials()),
} };

export default connect( mapStateToProps, mapDispatchToProps )(TrialPage);
