import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';

import {
  Paper,
  InputBase,
  Divider,
  IconButton,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core/';

import { PersonAdd, Send } from "@material-ui/icons/";

import { is_email } from '../../util/regex';

const get_styles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%"
  },
  progress: {
    margin: '4px 12px'
  },
  input: {
    marginLeft: theme.spacing(1),
    padding: 8,
    flex: 1
  },
  send_btn_fbl: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  prompt: {
    padding: theme.spacing(2)
  },
  send_btn_lbl: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  iconButton: {
    [theme.breakpoints.down('sm')]: {
      '&:disabled': { display: 'none' },
    },
    padding: 10
  },
  divider: {
    [theme.breakpoints.down('sm')]: { display: 'none' },
    height: 28,
    margin: 4,
  },
  progress_divider: {
    [theme.breakpoints.down('sm')]: { display: 'none' },
    height: 28,
    margin: '4px 16px 4px 4px'
  },
  send_icon: {
    marginLeft: theme.spacing(1)
  }
}));

const SendEmail = (props) => {
  const classes = get_styles();
  const { placeholder, prompt, full_send_lbl, send, sending } = props;
  const [email, set_email] = React.useState("");
  const [send_ready, set_send_ready] = React.useState(false);
  const [enabled, set_enabled] = React.useState(false);

  const on_handle_change = e => {
    const em = e.target.value;
    set_email(em);
    if (is_email(em)) {
      set_send_ready(false);
    } else {
      set_send_ready(true);
    }
  };

  const handle_send = () => send({email});
  const toggle_enabled = () => set_enabled(!enabled);

  const get_form = () =>
    !enabled ? (
      <Typography className={ classes.prompt } variant="subtitle2">{ prompt }</Typography>
    ) : (
      <form className={ classes.root } autoComplete="off">
        <InputBase
          autoComplete="off"
          value={email}
          onChange={on_handle_change}
          className={classes.input}
          placeholder={ placeholder }
        />
        <Button
          onClick={ handle_send }
          disabled={send_ready}
          color="primary"
          className={classes.iconButton}
          aria-label="directions"
        >
          <Typography className={classes.send_btn_lbl} variant="subtitle2">
            Send<span className={classes.send_btn_fbl}> { full_send_lbl }</span>
          </Typography>
          <Send className={classes.send_icon} />
        </Button>
      </form>
    );
    if (sending && email) set_email('');


  return (sending) ? (
    <Paper className={classes.root}>
      <CircularProgress className={ classes.progress } size={24} />
      <Divider className={classes.progress_divider} orientation="vertical" />
      <Typography>Sending Invitation</Typography>
    </Paper>
  ) : (
    <Paper className={classes.root}>
      <IconButton
        disabled={ (email) ? true : false }
        color="primary"
        onClick={toggle_enabled}
        className={classes.iconButton}
        aria-label="directions"
      >
        <PersonAdd />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      { get_form() }
    </Paper>
  );
}

SendEmail.defaultProps = {
  placeholder: "Add user by email",
  prompt: "Invite A Member to Your Team By Email",
  full_send_lbl: "Invite",
  sending: false,
}

SendEmail.propTypes = {
  placeholder: PropTypes.string,
  prompt: PropTypes.string,
  full_send_lbl: PropTypes.string,
  send: PropTypes.func.isRequired,
  sending: PropTypes.bool.isRequired,
}

export default SendEmail;
