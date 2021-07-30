import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core/';

const get_styles = makeStyles(theme => ({
  input_fields: {
    margin: theme.spacing(1),
    borderRadius: 0,
    [theme.breakpoints.up('sm')]: {
      margin: '1%',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '2%',
    },
  },
  no_attempt: {
    borderRadius: 0,
    [theme.breakpoints.up('sm')]: {
      width: '98%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '96%',
    },
  },
  failure_attempt: {
    "& input": {
      background: '#fff2f2',
      color: '#990000'
    },
  },
  error_msg: {
    width: '90%',
    margin: '0 auto 20px auto',
    color: '#990000',
  },
}));

const TextField = (props) => {
  const classes = get_styles();
  const {
    on_change,
    rows,
    disabled,
    error_msg,
    value,
    label
  } = props;
  const field_class = (error_msg) ? classes.failure_attempt : classes.no_attempt;
  const handle_change = e => on_change(e.target.value);

  const label_width = label.length * 10;

  const id = (props.id) ? props.id : label.toLowerCase().replace(' ', '_');
  const disable_input = (disabled) ? true : false;

  return (rows === 1) ? (
    <FormControl fullWidth className={ classes.input_fields } variant="outlined">
      <InputLabel className={ field_class } htmlFor={ id }>{ label }</InputLabel>
      <OutlinedInput className={ field_class } id={ id }
        disabled={ disable_input }
        type='text'
        labelWidth={label_width}
        onChange={ handle_change }
        value={ value }
      />
      { error_msg }
    </FormControl>
  ) : (
    <FormControl fullWidth className={ classes.input_fields } variant="outlined">
      <InputLabel className={ field_class } htmlFor={ id }>{ label }</InputLabel>
      <OutlinedInput className={ field_class } id={ id }
        disabled={ disable_input }
        labelWidth={label_width}
        multiline
        rows={ rows }
        onChange={ handle_change }
        value={ value }
      />
      { error_msg }
    </FormControl>
  )
}

TextField.defaultProps = {
  error_msg: '',
  value: '',
  rows: 1,
}

TextField.propTypes = {
  id: PropTypes.string,
  error_msg: PropTypes.string.isRequired,
  on_change: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  rows: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
}

export default TextField;
