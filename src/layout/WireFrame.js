import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import { set_dialog } from '../store/store.app';
import { CssBaseline } from '@material-ui/core';

import TopMenu from './TopMenu';
import SideMenu from './SideMenu';

import LoginDialog from '../components/dialogs/LoginDialog';

import { UserProps } from '../models/User';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  main: {
    width: '100%',
    display: 'block'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    width: '100%',
    overflowY: 'auto',
    [theme.breakpoints.down('sm')]: {
      flexGrow: 0,
      padding: theme.spacing(1),
    },
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function WireFrame(props) {
  const { children, user, set_mobile_open, mobile_open, subscription, location } = props;

  const classes = useStyles();
  const handleDrawerToggle = () => set_mobile_open(!mobile_open);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <LoginDialog />
      <TopMenu toggle={ handleDrawerToggle }></TopMenu>
      <SideMenu
        profile={ user }
        subscription={ subscription }
        toggle={ handleDrawerToggle }
        open={ mobile_open }
        location={ location }
      ></SideMenu>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        { children }
      </main>
    </div>
  );
}

WireFrame.propTypes = {
  user: UserProps,
};

const mapStateToProps = (state) => { return {
    user: state.user.profile,
    account: state.account,
    mobile_open: state.app.dialogs.mobile_open,
    subscription: state.account.subscription,
}};

const mapDispatchToProps = (dispatch) => { return {
  set_mobile_open: (open) => dispatch(set_dialog('mobile_open', open))
} };

export default connect( mapStateToProps, mapDispatchToProps )(withRouter(WireFrame));
