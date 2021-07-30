import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { UserProps } from '../../models/User';
import { AccountProps } from '../../models/Account';

import {
  Typography,
  List,
} from '@material-ui/core/';

import { api_update_user_account } from '../../store/store.account';

import {
  TabPanel,
  UploadButton,
  ToggleEdit,
} from '../';

import {
  DisplayValue,
  TextInputField
} from '../form-fields/';

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
  }
}));

const UserAccountTab = (props) => {
  const classes = get_styles();
  const { tab_index, tab_name, account, update, connection } = props;

  const [values, set_values] = React.useState({});
  const [edit_mode, set_edit_mode] = React.useState(false);
  // finish button example as per https://codesandbox.io/s/o57l2?file=/demo.js:1808-1825
  const update_account = () => update(values);

  const toggle_edit_mode = () => {
    set_values(account);
    set_edit_mode(!edit_mode);
  };

  const { state } = connection;
  const updating = (state === 'loading') ? true : false;

  const get_update_button = () => {
    return (edit_mode) ? (
      <UploadButton
        update={ update_account }
        updating={ updating }
        label="Update Profile Information"
        exit={ () => set_edit_mode(!edit_mode) }
      />
    ) : '';
  }

  const get_val = (key) => (values.hasOwnProperty(key))
    ? values[key] : account[key];

  const get_text_field = (lbl, key) => {
    const val = get_val(key);
    const on_change = val => set_values({...values, [key]: val });
    return (edit_mode)
      ? <TextInputField label={ lbl } value={ val } on_change={ on_change } />
      : <DisplayValue key={ key } label={ lbl } value={ val }/>;
  }

  return (
    <TabPanel className={ classes.root } value={tab_index} index={ tab_name }>
      <ToggleEdit toggle={ toggle_edit_mode } editing={ edit_mode } />
      <Typography className={ classes.tab_title } variant="subtitle1">Your Account Information</Typography>
      <List className={ classes.items }>
        { get_text_field("Company Name", "company_name") }
      </List>
      { get_update_button() }
    </TabPanel>
  );
}

UserAccountTab.propTypes = {
  tab_index: PropTypes.string.isRequired,
  tab_name: PropTypes.string.isRequired,
  profile: UserProps,
  account: AccountProps,
  connection: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => { return {
    profile: state.user.profile,
    account: state.account.data,
    connection: state.app.connections.api_update_user_account || {},
} };

const mapDispatchToProps = (dispatch) => { return {
    update: (data) => api_update_user_account(dispatch, data),
}};

export default connect( mapStateToProps, mapDispatchToProps )(UserAccountTab);
