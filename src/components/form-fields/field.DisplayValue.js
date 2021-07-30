import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  ListItem,
  Typography,
  Divider,
} from '@material-ui/core/';

const get_styles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    borderRadius: 0,
    [theme.breakpoints.up('sm')]: { margin: '1%' },
    [theme.breakpoints.down('sm')]: { margin: '2%' },
    paddingBottom: theme.spacing(2),
  },
  label: {
    width: '25%',
    [theme.breakpoints.down('lg')]: { width: '35%' },
    [theme.breakpoints.down('md')]: { width: '40%' },
    [theme.breakpoints.down('sm')]: { width: '100%', display: 'block' },
  },
  value: {
    width: '75%',
    [theme.breakpoints.down('lg')]: { width: '65%' },
    [theme.breakpoints.down('md')]: { width: '60%' },
    [theme.breakpoints.down('sm')]: { width: '100%', display: 'block' },
  },
}));

const DisplayValue = (props) => {
  const classes = get_styles();
  const { value, label } = props;

    return (
      <Fragment>
        <ListItem className={ classes.root }>
          <Typography className={ classes.label }>{ label }</Typography>
          <Typography className={ classes.value }>{ value }</Typography>
        </ListItem>
        <Divider />
      </Fragment>
    );
}

DisplayValue.defaultProps = {
  value: ''
}

DisplayValue.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
}

export default DisplayValue;
