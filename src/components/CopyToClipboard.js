import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Snackbar,
  SnackbarContent,
  IconButton,
} from '@material-ui/core/';

import {
  CheckCircle,
  Close,
} from '@material-ui/icons/';

import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const get_styles = makeStyles(theme => ({
  root: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
    fontSize: 20,
    backgroundColor: green[600],
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}))

const CopyToClipboard = (props) => {
    const { text, mime_type, id, message, children } = props;
    const classes = get_styles();
    const [open, set_open] = React.useState(false);

    function handle_close(event, reason) {
      return (reason !== 'clickaway') ? set_open(false) : undefined;
    }

    const copy_to_clip = () => {
      function listener(e) {
        e.clipboardData.setData(mime_type, text);
        e.preventDefault();
      }
      set_open(true);
      document.addEventListener("copy", listener);
      document.execCommand("copy");
      document.removeEventListener("copy", listener);
    };

    const span_id = `${id}-snackbar`;

    return (
      <Fragment>
        <span className={ classes.button } onClick={ copy_to_clip }>{children}</span>
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
            open={ open } autoHideDuration={ 6000 } onClose={ handle_close }
          >
            <SnackbarContent
              className={classes.root}
              aria-describedby={ span_id }
              message={
                <span id={ span_id } className={classes.message}>
                  <CheckCircle className={classes.root} />
                  <Typography>{ message }</Typography>
                </span>
              }
              action={[
                <IconButton key="close" aria-label="Close" color="inherit">
                  <Close className={classes.root} />
                </IconButton>,
              ]}
            />
        </Snackbar>
      </Fragment>
    );
}

CopyToClipboard.defaultProps = {
  message: 'Copied to Clipboard!',
  mime_type: 'text/plain'
}

CopyToClipboard.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  mime_type: PropTypes.string.isRequired,
  message:PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ]).isRequired
}

export default CopyToClipboard;
