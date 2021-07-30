import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Paper,
  Typography,
  Divider,
  Button,
} from '@material-ui/core/';

import { UserProps } from '../models/User';
import { open_dialog } from '../store/store.app';
import { test_api } from '../util/laravel-api';

import {
  Alert,
  AlertTitle,
} from '@material-ui/lab/';

import NotLoggedIn from '../components/content/home.NotLoggedIn';
import { LoadingCard } from '../components/';
import SignupStepper from '../components/SignupStepper';

const get_styles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(4),
  },
  divider: {
    marginBottom: 15
  },
  notification: {
    marginTop: 20
  },
  action_btn: {
    marginRight: 20
  }
}));

const HomePage = (props) => {
  const classes = get_styles();
  const { api_ready, account, subscription, profile, open_login } = props;

  const test_call = () => {
    test_api({
      date_range: {
        start: '2020-09-01',
        end: '2020-09-01',
      },
    }).then(response => {
      console.log(response.data);
      window.response = response.data;
    });
  }
  // const {add_lookups} = props;
  const upload_lookups = (e) => {
    // add_lookups({
    // 	"treatments": [{
    // 		"jane_label": "Initial Naturopathic Consultation  90 Minutes",
    // 		"label": "90m Initial ND consult"
    // 	}],
    // 	"products": [{
    // 		"name": "Bioclinic-B12 Methylcobal  60c",
    // 		"ref_id": 44
    // 	}, {
    // 		"name": "Bioclinic-Berberine HCI",
    // 		"ref_id": 169
    // 	}]
    // }).then(resp => console.log(resp.data));
  }
  const upload_lookups_btn = (false) ? (
    <div><Button onClick={ upload_lookups }>Upload Lookups</Button></div>
  ): '';

  return ( !api_ready ) ? (
    <LoadingCard queue={ ['Connecting'] } />
  ) : (subscription.id) ? (
    <Paper className={classes.paper}>
      <Typography variant="h5">You are logged in as { profile.first_name }.</Typography>
      <Divider className={ classes.divider }/>
      <div><Button onClick={ test_call }>Test API</Button></div>
      { upload_lookups_btn }
    </Paper>
  ) : (account.data.id) ? (
    <Paper className={classes.paper}>
      <Typography variant="h5">You are logged in as { profile.first_name }.</Typography>
      <Divider className={ classes.divider }/>
      <SignupStepper current_step={ 3 }/>
      <Alert severity="info">
        <AlertTitle>Your Account hasn't been set up yet.</AlertTitle>
        <Typography variant="body1">You should hear a call from us shortly.</Typography>
      </Alert>
      <Typography className={ classes.notification } variant="body1">
        <Button variant="contained" color="primary" className={ classes.action_btn } component={ Link } to="/account" >
          Click here
        </Button>
        to resubmit your call request.
      </Typography>
    </Paper>
  )  : (  // not logged in
    <NotLoggedIn open_login={ open_login }/>
  );
}

HomePage.propTypes = {
  profile: UserProps,
};

const mapStateToProps = state => { return {
  api_ready: state.app.api_ready,
  account: state.account,
  subscription: state.account.subscription,
  profile: state.user.profile,
} };

const mapDispatchToProps = (dispatch) => { return {
  open_login: () => dispatch(open_dialog('login')),
} };

export default connect( mapStateToProps, mapDispatchToProps )(HomePage);
