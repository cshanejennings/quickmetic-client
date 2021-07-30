import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import {
  // Paper,
  Typography,
  Divider,
} from '@material-ui/core/';

import Trial from '../components/trial';
import TrialSelector from '../components/trial-selector';

import { create_trial } from '../store/store.trial';

const get_styles = makeStyles(theme => ({
}));

const TrialPage = (props) => {
  const classes = get_styles();

  const { trial } = props;

  const { row_values, row_digits, header_digits } = trial.data;
  const display_trial = () => {
    return (row_values.length) ? <Trial /> : <TrialSelector />;
  }


  return (
    <div>
      <Typography variant="h5">Addition { row_digits } by { header_digits }</Typography>
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
} };

export default connect( mapStateToProps, mapDispatchToProps )(TrialPage);
