import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  FormGroup,
  FormControlLabel,
  Switch
} from '@material-ui/core/';

const get_styles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    borderRadius: 0,
    [theme.breakpoints.up('sm')]: { margin: '1%' },
    [theme.breakpoints.down('sm')]: { margin: '2%' },
    paddingBottom: theme.spacing(2),
    borderBottom: '1px solid #eee',
  },
  switch: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
  }
}));

const CheckboxInputField = (props) => {
  const classes = get_styles();
  const { on_click, value, label } = props;
    return (
      <FormGroup className={ classes.root } row>
          <FormControlLabel labelPlacement="end" color="secondary"
            control={ <Switch
              className={ classes.switch }
              checked={value}
              onChange={on_click}
            />}
            label={ label }
        />
      </FormGroup>
    );
}

CheckboxInputField.defaultProps = {
  error_msg: ''
}

CheckboxInputField.propTypes = {
  on_click: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
}

export default CheckboxInputField;
