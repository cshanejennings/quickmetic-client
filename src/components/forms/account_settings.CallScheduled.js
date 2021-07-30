import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import moment from 'moment';

import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  CircularProgress,
} from '@material-ui/core/';

import {
  Alert,
  AlertTitle,
} from '@material-ui/lab/';

import {
  Phone,
  Schedule,
} from '@material-ui/icons/';

import { AccountProps } from '../../models/Account';

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
  update_notice: {
    margin: '20px 10px'
  },
  notification_times: {
    margin: '10px 0'
  },
  updated_notice: {
    margin: '20px 10px'
  },
  content: {
    margin: 20
  },
}));

const CallScheduled = (props) => {
  const classes = get_styles();
  const {account_data, update} = props;

  const [values, set_values] = React.useState({
    company_name: account_data.company_name,
    phone_number: account_data.phone_number,
    time: '',
  });

  const [updating, set_updating] = React.useState(false);
  const [updated, set_updated] = React.useState(false);

  const get_update_func = id => val => set_values({...values, [id]: val});

  const submit = () => {
    set_updating(true);
    update(values).then(
      resp => set_updated(true)
    ).catch(e => {
      set_updating(false);
      console.error(e);
    });
  }

  const { updated_at, created_at } = account_data;

  const get_update_time = () => {
    return (updated_at && updated_at.toString() !== created_at.toString()) ? (
      <Typography>You resubmitted your request <strong>{ moment(updated_at).fromNow() }</strong></Typography>
    ) : '';
   }

  const block_submit = (
    !updating &&
    values.company_name.length > 2 &&
    // values.phone_number.length === 12 && //TODO: find out why this is failing
    values.time.length > 3
  ) ? false : true;

  const get_form = () => {
    return (updated) ? (
      <Typography variant="h5" className={ classes.updated_notice }>We have updated your submission, you should hear from us soon!</Typography>
    ) : (
      <Fragment>

        <List>
          <ListItem>
            <ListItemIcon className={ classes.list_icon }>
                <Phone />
            </ListItemIcon>
            <ListItemText>
            <PhoneNumber label="Phone Number"
              error_msg={''}
              on_change={ get_update_func('phone_number') }
              disabled={ updating }
              value={ values.phone_number}
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
                disabled={ updating }
              />
            </ListItemText>
          </ListItem>
        </List>
        <ListItem>
          <ListItemIcon className={ classes.list_icon }>
          { (updating) ? (<CircularProgress />) : '' }
          </ListItemIcon>
          <ListItemText>
            <Button
              disabled={ block_submit }
              className={classes.submit}
              color="primary"
              variant="contained"
              onClick={ submit }
            >Update your calling information</Button>
          </ListItemText>
        </ListItem>
      </Fragment>
    )
  }

    return (
      <ContentWrapper icon={ <Phone /> } heading="You should hear from us soon">
      <SignupStepper current_step={ 3 }/>
        <Typography className={ classes.content } variant="subtitle2">Your setup call has been scheduled.</Typography>
        <Typography className={ classes.content } >
          No further action is needed from you at this time, however if something
          has changed and you would like to update any of your conact information
          or preferred time for a call, you can do so below.
        </Typography>
        <Alert severity="info">
          <AlertTitle>
            <Typography>You submitted your call request <strong>{ moment(created_at).fromNow() }</strong></Typography>
            { get_update_time() }
          </AlertTitle>
          We try to respond as quickly as possible, but please allow up to 2 business days for a response.
        </Alert>
        <Divider className={ classes.content }/>
        { get_form() }
      </ContentWrapper>
    );
}

CallScheduled.propTypes = {
  update: PropTypes.func.isRequired,
  account_data: AccountProps
}

export default CallScheduled;
