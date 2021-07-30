import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@material-ui/core/';

import {
  Alert,
} from '@material-ui/lab/';

import {
  Business,
  Phone,
  Schedule,
} from '@material-ui/icons/';

import ContentWrapper from '../ContentWrapper';
import SignupStepper from '../SignupStepper';
import TextInputField from '../form-fields/field.TextField';
import PhoneNumber from '../form-fields/field.PhoneNumber';

const get_styles = makeStyles(theme => ({
  instruction: {
    margin: '20px 0px',
    padding: 20,
  },
  list_icon: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  btn_name: {
    border: '1px solid #3f51b5',
    padding: '3px 8px',
    margin: '0px 5px',
    color: '#3f51b5'
  },
  strong: {
    margin: '0 10px'
  },
  submit: {
    width: '100%',
    margin: theme.spacing(1),
    borderRadius: 0,
    [theme.breakpoints.up('sm')]: {
      margin: '1%',
      width: '98%',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '2%',
      width: '96%',
    },
  }
}));

const AccountSetup = (props) => {
  const classes = get_styles();
  const { update } = props;
  const [values, set_values] = React.useState({
    company_name: '',
    phone_number: '',
    time: '',
  });

  const get_update_func = (id) => (val) => {
    set_values({...values, [id]: val})
  };

  const submit = () => {
    console.log(values);
    update(values).then(resp => {
      console.log(resp)
    }).catch(e => {
      console.error(e);
    });
  }

  const block_submit = (
    values.company_name.length > 2 &&
    values.phone_number.length === 12 &&
    values.time.length > 5
  ) ? false : true;

  return (
    <ContentWrapper icon={ <Business /> } heading="SETUP YOUR ACCOUNT">
      <Alert severity="info">
        We need to enter your business information and create your phone number before you can get started.
      </Alert>
      <SignupStepper current_step={ 2 }/>
      <List>
        <ListItem>
          <ListItemIcon className={ classes.list_icon }>
              <Business />
          </ListItemIcon>
          <ListItemText>
          <TextInputField label="Company Name"
            error_msg={''}
            on_change={ get_update_func('company_name') }
            value={ values.company_name || '' }
            disabled={false}
          />
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon className={ classes.list_icon }>
              <Phone />
          </ListItemIcon>
          <ListItemText>
          <PhoneNumber label="Phone Number"
            error_msg={''}
            on_change={ get_update_func('phone_number') }
            disabled={ false }
            value={ values.phone_number }
          />
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon className={ classes.list_icon }>
            <Schedule />
          </ListItemIcon>
          <ListItemText>
            <TextInputField label="Best time to reach you"
              error_msg={''}
              rows={ 3 }
              on_change={ get_update_func('time') }
              value={ values.time || '' }
              disabled={false}
            />
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon className={ classes.list_icon }>
          </ListItemIcon>
          <ListItemText>
            <Button
              disabled={ block_submit }
              className={classes.submit}
              color="primary"
              variant="contained"
              onClick={ submit }
            >Request a call</Button>
          </ListItemText>
        </ListItem>
      </List>
      <Typography variant="body1" className={ classes.instruction }>
        We'll call you as soon as we can to get you setup with your new text number!
      </Typography>
    </ContentWrapper>
  );
}

AccountSetup.propTypes = {
  update: PropTypes.func.isRequired,
}

export default AccountSetup;
