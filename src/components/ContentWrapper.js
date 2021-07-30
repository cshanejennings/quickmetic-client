import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  Paper,
  Typography,
  Avatar,
  Divider,
} from '@material-ui/core/';

const get_styles = makeStyles(theme => ({
  paper: {
    position: 'relative',
    width: '100%',
    padding: '80px 5px 40px 5px',
    marginTop: 20,
    maxWidth: 800,
    borderRadius: 0
  },
  icon_header: {
    margin: 0,
    display: 'block',
    width: '100%',
    background: 'hsl(28, 0%, 88%)',
    height: '100px',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  main_heading: {
    width: '100%',
    display: 'block',
    position: 'absolute',
    color: 'hsl(28, 0%, 40%)',
    top: 50
  },
  avatar: {
    position: 'absolute',
    width: 60,
    height: 60,
    left: '50%',
    marginLeft: -20,
    top: -20,
    zIndex: 30,
    background: 'hsl(28, 0%, 40%)',
  },
  divider: {
    margin: '20px 0',
    display: 'block',
    background: '#eee',
    height: 1,
    width: '100%'
  },
}));

const ContentWrapper = (props) => {
  const {icon, heading, children} = props;
  const classes = get_styles();
    return (
      <Paper className={ classes.paper }>
        <div className={classes.icon_header}>
          <Avatar className={classes.avatar} >{ icon }</Avatar>
        </div>
        <Typography className={ classes.main_heading } align="center" variant="h5">{ heading }</Typography>
        <Divider className={classes.divider}/>
        { children }
      </Paper>
    );
}

ContentWrapper.propTypes = {
  heading: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ]).isRequired,
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ]).isRequired,
}

export default ContentWrapper;
