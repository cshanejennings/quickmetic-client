import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@material-ui/core/';

const get_styles = makeStyles(theme => ({
  root: {
    marginTop: 10,
    marginBottom: 20,
    // borderTop: '1px solid #ddd',
    // borderBottom: '1px solid #ddd'
  },
  filter_header : {
    marginTop: 10,
    marginRight: 20,
  },
}));

const OptionRow = (props) => {
  const classes = get_styles();
  const { label, status, set_status } = props;

  const get_status_control = (lbl, key) => {
    const val = status[lbl];
    return (
      <FormControlLabel key={ key } label={ lbl } control={
        <Checkbox
          onClick={ () => set_status({ ...status, [lbl]: !val }) }
          checked={ val }
          name={ lbl }
        />
      }/>
    );
  }

    return (
      <FormGroup className={ classes.root } row>
        <Typography className={ classes.filter_header }>
          { label }
        </Typography>
        { Object.keys(status).map(get_status_control) }
      </FormGroup>
    );
}

OptionRow.propTypes = {
  label: PropTypes.string.isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired,
  set_status: PropTypes.func.isRequired,
}

export default OptionRow;
