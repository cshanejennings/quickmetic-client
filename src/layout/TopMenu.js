import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { open_dialog } from '../store/store.app';

import MenuIcon from '@material-ui/icons/Menu';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import LockIcon from '@material-ui/icons/Lock';

import { APP_COMPONENTS } from '../config';
import { api_server_logout } from '../store/store.user.login';
import EnableAudio from '../components/EnableAudio';

const drawerWidth = APP_COMPONENTS.DRAWER_WIDTH;

const get_styles = makeStyles(theme => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  login: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1,
  },
  account_btn: {
    color: '#fff',
    marginLeft: 'auto'
  },
  hide: {
    display: 'none',
  },
  toolbar: theme.mixins.toolbar,
}));
/* eslint no-undef: 0 */ // --> OFF

// https://github.com/alex996/react-writers-blog/blob/master/src/Components/App.js
// https://codesandbox.io/s/y90re
const ResponsiveDrawer = (props) => {
  const classes = get_styles();
  const {
    open_login,
    profile,
    server_logout,
    toggle,
    api_ready,
    user_ready,
  } = props;

  const [anchor_el, set_anchor_el] = React.useState(null);

  const handle_close = () => set_anchor_el(null);
  const handle_click = (e) => set_anchor_el(e.currentTarget);

  const { first_name, last_name } = profile;

  const get_login_button = () => {
    return  (!user_ready) ? (
      <Button className={ classes.account_btn } onClick={ open_login } >
        <LockIcon className={classes.login} fontSize="small" /> Log in
      </Button>
    ) : (
      <Fragment>
        <Button className={ classes.account_btn } onClick={ handle_click }>
          { `${first_name} ${last_name}` } <ExpandMoreIcon />
        </Button>
        <Menu
          elevation={0}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          id="customized-menu"
          anchorEl={ anchor_el }
          keepMounted
          open={ Boolean(anchor_el) }
          onClose={ handle_close }
        >
        <MenuItem component={ Link } to="/account">
          <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Account" />
        </MenuItem>
        <MenuItem onClick={ server_logout }>
          <ListItemIcon><ExitToAppIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Log Out" />
        </MenuItem>
        </Menu>
        <EnableAudio />
      </Fragment>
    )
  }

  return (!api_ready) ? (
    <AppBar position="fixed" className={classes.appBar} />
  ) : (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton aria-label="Menu" onClick={ toggle } className={ classes.menuButton } >
          <MenuIcon />
        </IconButton>
        { get_login_button() }
      </Toolbar>
    </AppBar>
  );
}

ResponsiveDrawer.propTypes = {
  toggle: PropTypes.func.isRequired,
  user_data: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
  }),
  initialized: PropTypes.bool,
  authorizing: PropTypes.bool,
  signed_in: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    api_ready: state.app.api_ready,
    user_ready: state.app.user_ready,
    profile: state.user.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    server_logout: (data) => dispatch(api_server_logout(data)),
    open_login: () => dispatch(open_dialog('login'))
  };
};

export default connect( mapStateToProps, mapDispatchToProps )(ResponsiveDrawer);
