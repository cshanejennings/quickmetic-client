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
          <Typography variant="h6">What is quickmetic?</Typography>
          <Divider className={ classes.divider }></Divider>
          <Typography paragraph={ true } variant="body1">
            This is a personal project I am creating to help my kids improve the
            speed of their arithmetic.
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
