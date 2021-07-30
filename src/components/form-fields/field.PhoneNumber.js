import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import MuiPhoneNumber from 'material-ui-phone-number';

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
    marginLeft: '1%',
    [theme.breakpoints.up('sm')]: {
      width: '98%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '96%',
    },
  },
  compact: {
    borderBottom: 'none',
  },

}));

const PhoneNumber = (props) => {
  const classes = get_styles();
  const {
    value,
    variant,
    on_change,
    disabled,
    error_msg,
    label
  } = props;
  const field_class = (error_msg) ? classes.failure_attempt : classes.no_attempt;

  const handle_change = e => on_change(e.replace(/[()\s-]*/g, ''));

  const id = (props.id) ? props.id : label.toLowerCase().replace(' ', '_');
  const disable_input = (disabled) ? true : false;

  return (variant === "outlined") ? (
    <MuiPhoneNumber
      id={ id }
      className={ field_class }
        label={ label }
        variant="outlined"
        disabled={ disable_input }
        onlyCountries={['us', 'ca']}
        defaultCountry='ca'
        value={ value }
        onChange={ handle_change }
        preferredCountries='ca'
        countryCodeEditable={ false }
      />
  ) : (
    <MuiPhoneNumber
        className={ classes.compact }
        label={ label }
        id={ id }
        disabled={ disable_input }
        onlyCountries={['us', 'ca']}
        defaultCountry='ca'
        value={ value }
        onChange={ handle_change }
        preferredCountries='ca'
        countryCodeEditable={ false }
        InputProps={{ disableUnderline: true }}
      />
  )
}

PhoneNumber.defaultProps = {
  error_msg: '',
  rows: 1,
  variant: 'outlined'
}

PhoneNumber.propTypes = {
  id: PropTypes.string,
  error_msg: PropTypes.string.isRequired,
  on_change: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  variant: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default PhoneNumber;
