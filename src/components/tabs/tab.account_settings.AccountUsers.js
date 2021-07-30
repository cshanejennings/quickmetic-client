import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { UserProps } from '../../models/User';
import { AccountProps } from '../../models/Account';

import moment from 'moment';

import {
  Typography,
  List,
  Divider,
  Tooltip,
  // Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  ListItemSecondaryAction,
  Button,
} from '@material-ui/core/';

import {
  Person,
  PersonOutline,
  Block,
  Email,
} from "@material-ui/icons/";

import {
  queue_users,
  api_get_account_users,
  api_invite_new_user,
  api_resend_user_invite,
  api_delete_user_invite,
} from '../../store/store.account';

import {
  TabPanel,
} from '../';

import SendEmail from '../forms/account_settings.SendEmail';

const get_styles = makeStyles(theme => ({
  root: {
    marginTop: 20,
  },
  tab_title: {
    margin: '0px 20px 10px 20px',
    padding: 5,
    borderBottom: '1px solid',
    [theme.breakpoints.down('sm')]: {
      margin: '0px 5px 10px 5px',
    },
  },
  invite_actions: {
    [theme.breakpoints.down('sm')]: {
      position:'relative',
      padding: '16px 0 0 76px'
    }
  },
  invite_btn: {
    margin: '0px 4px',
    borderRadius: 0,
  },
  invite_icon: {
    marginRight: 4,
    width: 16,
    height: 16,
  },
  invite_txt: {
    marginLeft: 4,
  },
  loading_area: {
    width: '100%',
    height: '70px',
    display: 'block',
    position: 'relative',
  },
  spinner: {
    position: 'absolute',
    left: '-20px',
    top: 0,
    marginLeft: '50%',
  }
}));

const AccountUsersTab = (props) => {
  const classes = get_styles();
  const [inviting, set_inviting] = React.useState(false);
  const {
    profile,
    account_data,
    get_queue,
    tab_index,
    tab_name,
    invite_new_user,
    resend_user_invite,
    delete_user_invite,
    connections,
    users,
    invitations
  } = props;

  const connection = connections.api_get_account_users || {};
  const send_delete_invite = (data) => {
    delete_user_invite(data);
  }
  const send_invite = (data) => {
    invite_new_user(data).then((resp => {
      set_inviting(false);
    })).catch(e => {
      console.error(e);
      set_inviting(false);
    });
    set_inviting(true);
  }

  // const queue = get_queue({connection, profile, users});
  get_queue({connections, profile, users, account_data});

  const get_user = (user, key) => (
    <Fragment key={key}>
      <ListItem  dense={ true } className={ classes.item }>
        <ListItemIcon><Person color="primary" /></ListItemIcon>
        <ListItemText primary={
          <Typography variant="subtitle2">{`${user.first_name} ${user.last_name}`}</Typography>
        } secondary={ user.email } />
      </ListItem>
      <Divider />
    </Fragment>
  );

  const get_invited_user = (invite, key) => {
    const cancel_invite = () => send_delete_invite(invite);
    const resend_invite = () => resend_user_invite(invite);
    return (
      <Fragment key={key}>
        <ListItem  dense={ true } className={ classes.item }>
          <ListItemIcon><PersonOutline color="secondary" /></ListItemIcon>
          <ListItemText primary={ `Invitation sent ${moment(invite.updated_at || invite.created_at).fromNow()}` } secondary={ invite.email } />
          <ListItemSecondaryAction className={classes.invite_actions}>
            <Tooltip title="Cancel Invitation" aria-label="cancel invitation">
              <Button onClick={ cancel_invite } className={ classes.invite_btn } size="small">
                <Block color="secondary" className={ classes.invite_icon }/>
                <Typography color="secondary" className={classes.invite_txt} variant="subtitle2">Cancel </Typography>
              </Button>
            </Tooltip>
            <Tooltip title="Resend Invitation Email" aria-label="resend invitation email">
              <Button onClick={ resend_invite } className={ classes.invite_btn } size="small">
                <Email color="primary" className={ classes.invite_icon }/>
                <Typography color="primary" className={classes.invite_txt} variant="subtitle2">Resend </Typography>
              </Button>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </Fragment>
    );
  };

  const get_list = () => {
    return (connection.state === "loading") ? (
      <div className={ classes.loading_area }>
        <CircularProgress className={ classes.spinner }/>
      </div>
    ): (
      <List className={ classes.items }>
        { users.map(get_user) }
        { invitations.map(get_invited_user) }
      </List>
    );
  }

  return (
    <TabPanel className={ classes.root } value={tab_index} index={ tab_name }>
      <Typography className={ classes.tab_title } variant="subtitle1">Active users on this account</Typography>
      { get_list() }
      <SendEmail
        placeholder="Add user by email"
        prompt="Invite A Member to Your Team By Email"
        full_send_lbl="Invite"
        send={ send_invite }
        sending={ inviting }
      />
    </TabPanel>
  );
}

AccountUsersTab.propTypes = {
  tab_index: PropTypes.string.isRequired,
  tab_name: PropTypes.string.isRequired,
  profile: UserProps,
  account: AccountProps,
}

const mapStateToProps = (state) => { return {
    connections: state.app.connections,
    profile: state.user.profile,
    account_data: state.account.data,
    users: state.account.users,
    invitations: state.account.invitations,
} };

const mapDispatchToProps = (dispatch) => { return {
  get_queue: (data) => queue_users(dispatch, data), // profile & users
  get_account_users: () => api_get_account_users(dispatch),
  invite_new_user: (data) => api_invite_new_user(dispatch, data),
  resend_user_invite: (data) => api_resend_user_invite(dispatch, data),
  delete_user_invite: (data) => api_delete_user_invite(dispatch, data),
}};

export default connect( mapStateToProps, mapDispatchToProps )(AccountUsersTab);
