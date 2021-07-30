import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import {
  // Paper,
  Typography,
  Divider,
  // Button,
} from '@material-ui/core/';

import {
  Alert,
  AlertTitle
} from '@material-ui/lab/';

import {
  // Star
} from '@material-ui/icons/';

export const URI_BASE = process.env.REACT_APP_MATH_DASHBOARD_SERVER;

const get_styles = makeStyles(theme => ({
  img_card: {
    maxWidth: 480,
  },
  divider: {
    margin: 20
  }
}));

const HomePage = (props) => {
  const classes = get_styles();
  // const base_img_url = `${process.env.REACT_APP_MATH_DASHBOARD_SERVER}/images/`

  return (
    <div>
      <Typography variant="h5">Help documentation goes here</Typography>
      <Divider className={ classes.divider }/>
      <Alert severity="info">
        <AlertTitle>No Help Files Defined</AlertTitle>
      </Alert>
    </div>
  );
}

const mapStateToProps = state => { return {
  api_ready: state.app.api_ready,
  connections: state.app.connections,
  account: state.account,
  subscription: state.account.subscription,
  profile: state.user.profile,
} };

const mapDispatchToProps = (dispatch) => { return {
} };

export default connect( mapStateToProps, mapDispatchToProps )(HomePage);
