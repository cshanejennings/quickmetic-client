import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import {
  Divider,
  Button,
  Drawer,
  Hidden,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core/';

import Logo from './Logo';

import { UserProps } from '../models/User';
import { SubscriptionProps } from '../models/Subscription';

import {
  AttachMoney,
  GridOn,
  ContactSupport,
  Assessment,
} from '@material-ui/icons/';

import { APP_COMPONENTS } from '../config';
const drawerWidth = APP_COMPONENTS.DRAWER_WIDTH;

const get_styles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  home_btn: {
    borderRadius: 0
  },
  bottomPush: {
    position: "fixed",
    bottom: 0,
    width: drawerWidth,
    paddingBottom: 10,
  },
}));

const SideMenu = (props) => {
  const classes = get_styles();
  const theme = useTheme();
  const { window, open, toggle, location } = props;
  const { pathname } = location;
  const { first_name,  email } = props.profile;
  const container = window !== undefined ? () => window().document.body : undefined;

  const menu = (
    <div style={{overflow: 'hidden'}}>
      <Button component={Link} to={'/'} className={classes.home_btn} >
        <Logo />
      </Button>
      <MenuList>
        <MenuItem component={Link} disabled={ pathname === '/trial'} to="/trial">
        <ListItemIcon><GridOn /></ListItemIcon>
          <ListItemText primary="Trial" />
        </MenuItem>
        <MenuItem component={Link} disabled={ pathname === '/reports'} to="/reports">
        <ListItemIcon><Assessment /></ListItemIcon>
          <ListItemText primary="Reports" />
        </MenuItem>
      </MenuList>
      <Divider />
      <div className={classes.toolbar} />

      <div className={classes.bottomPush}>
        <Divider />
        <MenuList>
          <MenuItem component={Link} disabled={ pathname === '/pricing'} to="/pricing">
            <ListItemIcon><AttachMoney /></ListItemIcon>
            <ListItemText primary="Pricing" />
          </MenuItem>
          <MenuItem component={Link} disabled={ pathname === '/help'} to="/help">
            <ListItemIcon><ContactSupport /></ListItemIcon>
            <ListItemText primary="Help" />
          </MenuItem>
        </MenuList>
        <div style={{ marginTop: 20, textAlign: 'left', display: 'block', width: '100%'}}>
          { /* TODO:// Add avatar image here */}
          <h3 style={{ textAlign: 'left', display: 'block', width: '100%', margin: '0 0 0 10px'}}>{ first_name }</h3>
          <p style={{ textAlign: 'left', display: 'block', width: '100%', margin: '0 0 30px 10px'}}>{ email }</p>
        </div>
      </div>
    </div>
  );

    return (
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={ container }
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={open}
            onClose={toggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {menu}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer open variant="permanent" classes={{
              paper: classes.drawerPaper,
            }}
          >{menu}</Drawer>
        </Hidden>
      </nav>
    );
}

SideMenu.propTypes = {
  profile: UserProps,
  subscription: SubscriptionProps,
  toggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
    hash: PropTypes.string.isRequired,
  }),
}

export default SideMenu;
