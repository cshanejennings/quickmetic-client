import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  FormControl,
  TextField,
} from '@material-ui/core/';

import {get_rows_of_objects} from '../../util/csv';

import {
  // Visibility,
  // VisibilityOff,
} from '@material-ui/icons/';

const get_styles = makeStyles(theme => ({
  input_fields: {
    margin: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      margin: '1%',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '2%',
    },
  },
  no_attempt: {
    [theme.breakpoints.up('sm')]: {
      width: '90%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '96%',
    },
  },
  dropzone: {
    width: 400,
    height: 150,
    minHeight: 150,
  }
}));

const SpreadsheetField = (props) => {
  const classes = get_styles();

  const { children, on_ready } = props;

  const handle_change = (e) => {
    try {
      const rows = e.target.value.split('\n').map(r => r.split('\t'));
      on_ready(get_rows_of_objects(rows));
    } catch (e) {
      console.error(e);
    }

  }

//       <InputLabel className={ classes.label } htmlFor="password_input">Password</InputLabel>
  const get_field = () => (children) ? children : (
    <TextField multiline
      label="Paste Jane Item Text here"
      rows={5}
      defaultValue=""
      variant="outlined"
      className={ classes.root }
      onChange={ handle_change }
      />
  );

  return (
    <FormControl fullWidth className={ classes.input_fields } variant="outlined">
      { get_field() }
    </FormControl>
  );
}

SpreadsheetField.propTypes = {
  on_ready: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ]),
}

export default SpreadsheetField;
