import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import {
  Grid,
  Typography,
  Divider,
  Button
} from '@material-ui/core/';

import {
  Alert,
  AlertTitle
} from '@material-ui/lab/';

const get_styles = makeStyles(theme => ({
  root: {
    marginTop: 20,
    marginBottom: 20
  },
  divider: {
    margin: '10px 30px 20px 0px'
  }
}));

const NotLoggedIn = (props) => {
  const classes = get_styles();
  const { open_login } = props;

    return (
      <Grid className={ classes.root } container spacing={1}>
        <Grid item md={6} xs={12}>
          <Typography variant="h6">What is Text Lobby?</Typography>
          <Divider className={ classes.divider }></Divider>
          <Typography paragraph={ true } variant="body1">
            TextLobby is a phone line used exclusively for text messaging
            your customers.  As of right now, the project is in the beta
            testing phase with a focus on extending the waiting room for
            clinic owners through text messaging.
          </Typography>
          <Typography paragraph={ true } variant="body1">
            If you are interested in knowing when TextLobby will be available
            to the public, you can add your name to the notification list
            here:
          </Typography>
        </Grid>
        <Grid item md={6} xs={12}>
        <Typography variant="h6">
          Are you a beta tester?
        </Typography>
        <Divider className={ classes.divider }/>
        <Alert severity="success">
          <AlertTitle>If you already have an account</AlertTitle>
          <Button onClick={ open_login } variant="contained" color="primary">Log In Here</Button>
        </Alert>
        <Divider className={ classes.divider }/>
        <Alert severity="info">
          <AlertTitle>Have you been invited to participate but haven't signed up?</AlertTitle>
          <Button component={ Link } to="/register" variant="contained" color="primary">Click here to register</Button>
        </Alert>

        </Grid>
      </Grid>
    );
}

NotLoggedIn.propTypes = {
  open_login: PropTypes.func.isRequired,
}

export default NotLoggedIn;
