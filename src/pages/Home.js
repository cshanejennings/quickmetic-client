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

import NotLoggedIn from '../components/content/home.NotLoggedIn';
import { LoadingCard } from '../components/';

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
  const { api_ready, profile, open_login } = props;

  return ( !api_ready ) ? (
    <LoadingCard queue={ ['Connecting'] } />
  ) : (profile.email) ? (
    <Paper className={classes.paper}>
      <Typography variant="h5">You are logged in as { profile.first_name }.</Typography>
      <Divider className={ classes.divider }/>
      <Button variant="contained" color="primary" className={ classes.action_btn } component={ Link } to="/trial" >
        Go to practice
      </Button>
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
