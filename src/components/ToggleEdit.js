import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  Button,
  Typography,
} from '@material-ui/core/';

import {
  Edit,
  Cancel,
} from '@material-ui/icons/';

const get_styles = makeStyles(theme => ({
  root: {
    position: "absolute",
    top: 70,
    right: 20,
    [theme.breakpoints.down('sm')]: {
      right: 0,
    },
  },
  icon: {
    marginLeft: 5
  },
  lbl: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  }
}));

const ToggleEdit = (props) => {
  const classes = get_styles();
  const { editing, toggle } = props;
  return (!editing) ? (
    <Button className={classes.root} size="small" onClick={ toggle }>
      <Typography variant="subtitle2" className={ classes.lbl }>Edit</Typography>
      <Edit className={classes.icon}/>
    </Button>
  ) : (
    <Button className={classes.root} size="small" onClick={ toggle }>
      <Typography variant="subtitle2" className={ classes.lbl }>Cancel</Typography>
      <Cancel className={classes.icon}/>
    </Button>
  );
}

ToggleEdit.propTypes = {
  editing: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}

export default ToggleEdit;
