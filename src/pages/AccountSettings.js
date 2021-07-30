import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { UserProps } from '../models/User';

import {
  Typography,
  Paper,
  Tabs,
  Tab,
} from '@material-ui/core/';

import { LoadingCard } from '../components';

import AccountSetup from '../components/forms/account_settings.AccountSetup';
import CallScheduled from '../components/forms/account_settings.CallScheduled';

import UserProfileTab from '../components/tabs/tab.account_settings.UserProfile';
import UserAccountTab from '../components/tabs/tab.account_settings.UserAccount';
import AccountUsersTab from '../components/tabs/tab.account_settings.AccountUsers';

import { queue_user } from '../store/store.user';
import { api_onboarding_schedule } from '../store/store.account';

const get_styles = makeStyles(theme => ({
  root: {
    marginTop: 20,
    flexGrow: 1,
    position: "relative",
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  edit_button: {
    position: "absolute",
    top: 60,
    right: 20,
  }
}));

const AccountSettings = (props) => {
  const classes = get_styles();

  const {
    connections,
    account_data,
    subscription,
    onboarding_schedule,
    profile,
    get_queue
  } = props;

  const [tab_index, set_tab_index] = React.useState("profile");
  // const [tab_index, set_tab_index] = React.useState("account");
  // const [tab_index, set_tab_index] = React.useState("users");
  const handleChange = (event, newValue) => { set_tab_index(newValue); };

  const queue = get_queue({connections, profile});
  return (queue.length) ? <LoadingCard queue={ queue } /> :
    (!account_data.id) ? (
    <AccountSetup update={ onboarding_schedule }/>
    ) : ( account_data.id && !subscription.sms_number) ? (
      <CallScheduled
        update={onboarding_schedule}
        account_data={account_data}
      />
    ) : (
    <div className={ classes.root }>
      <Typography variant="h4">Manage Account</Typography>
      <Paper square className={classes.root}>
        <Tabs value={tab_index} onChange={handleChange}>
          <Tab value="profile" variant="fullWidth" label="Profile" />
          <Tab value="account" variant="fullWidth" label="Account" />
          <Tab value="users" variant="fullWidth" label="Users" />
        </Tabs>
        <UserProfileTab tab_name="profile" tab_index={ tab_index } />
        <UserAccountTab tab_name="account" tab_index={ tab_index } />
        <AccountUsersTab tab_name="users" tab_index={ tab_index } />
      </Paper>
    </div>
  );

}

AccountSettings.propTypes = {
  profile: UserProps,
};

const mapStateToProps = (state) => { return {
  api_ready: state.app.api_ready,
  connections: state.app.connections,
  profile: state.user.profile,
  account_data: state.account.data,
  subscription: state.account.subscription
} };

const mapDispatchToProps = (dispatch) => { return {
    get_queue: (data) => queue_user(data, dispatch),
    onboarding_schedule: (data) => api_onboarding_schedule(dispatch, data)
}};

export default connect( mapStateToProps, mapDispatchToProps )(AccountSettings);
