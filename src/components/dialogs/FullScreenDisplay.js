import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  Dialog,
  Fade,
  Backdrop,
  Typography,
  IconButton
} from '@material-ui/core/';

import {
  Close
} from '@material-ui/icons/';

const get_styles = makeStyles(theme => ({
  root: {

  },
  modal: {

  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  title: {
    margin: 0,
    position: 'relative',
    padding: theme.spacing(2),
    height: theme.spacing(8)
  },
  close_button: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const FullScreenDisplay = (props) => {
  const classes = get_styles();
  const { title, open, close, children } = props;

    return <Dialog fullScreen
        aria-labelledby={ title }
        className={ classes.modal }
        open={ open }
        onClose={ close }
        closeAfterTransition
        BackdropComponent={ Backdrop }
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={ classes.title }>
              <Typography variant="h6">{ title }</Typography>
              <IconButton aria-label="close" className={classes.close_button} onClick={ close }>
                <Close />
              </IconButton>
            </div>
            { children }
          </div>
        </Fade>
      </Dialog>
}

FullScreenDisplay.defaultProps = {}

FullScreenDisplay.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ]).isRequired,
}

export default FullScreenDisplay;
