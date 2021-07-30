import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core/';

import {
  Alert,
  // AlertTitle,
} from '@material-ui/lab/';

import ContentWrapper from '../ContentWrapper';
import SignupStepper from '../SignupStepper';

import {
  Drafts,
  MoreHoriz,
} from '@material-ui/icons/';

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
  }
}));

const CheckYourInbox = (props) => {
  const classes = get_styles();
    return (
      <ContentWrapper icon={ <Drafts /> } heading="CHECK YOUR INBOX">
      <SignupStepper current_step={ 1 }/>
        <Alert severity="success">
          Your account has been created, we just need to verify your email address.
        </Alert>
        <List>
          <ListItem>
            <ListItemIcon className={ classes.list_icon }><MoreHoriz /></ListItemIcon>
            <ListItemText>Please note <strong className={ classes.strong }>it can take up to 5 minutes</strong> to receive this email.</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon className={ classes.list_icon }><MoreHoriz /></ListItemIcon>
            <ListItemText>Please <strong className={ classes.strong }>check your spam folder</strong> if you haven't received the email after five minutes.</ListItemText>
          </ListItem>
          <ListItem>
          <ListItemIcon className={ classes.list_icon }><MoreHoriz /></ListItemIcon>
            <ListItemText>Once you receive the email, please confirm yourself by clicking on the <strong className={ classes.btn_name}>verify user</strong> button sent to you in your email.</ListItemText>
          </ListItem>
        </List>
        <Typography variant="body1" className={ classes.instruction }>
          We appreciate your patience
        </Typography>
      </ContentWrapper>
    );
}

export default CheckYourInbox;
