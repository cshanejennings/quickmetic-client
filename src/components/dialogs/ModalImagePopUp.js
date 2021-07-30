import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  Modal,
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  img: {
    width: '100%',
    height: '100%',
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

const ModalImagePopUp = (props) => {
  const classes = get_styles();
  const { alt_txt, img_src, title } = props;
  const [open, set_open] = React.useState(false);

  const handle_close = () => set_open(false);
  const handle_open = () => set_open(true);

    return (
        <div className={ classes.root }>
        <img onClick={ handle_open } className={classes.img} src={img_src} alt={alt_txt}/>
        <Modal
          aria-labelledby={ alt_txt }
          className={ classes.modal }
          open={ open }
          onClose={ handle_close }
          closeAfterTransition
          BackdropComponent={ Backdrop }
          BackdropProps={{ timeout: 500 }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <div className={ classes.title }>
                <Typography variant="h6">{ title }</Typography>
                <IconButton aria-label="close" className={classes.close_button} onClick={handle_close}>
                  <Close />
                </IconButton>
              </div>
              <img className={classes.img} src={img_src} alt={alt_txt}/>
            </div>
          </Fade>
        </Modal>
        </div>
    );
}

ModalImagePopUp.defaultProps = {
  img_src: '',
  alt_txt: '',
  title: '',
}

ModalImagePopUp.propTypes = {
  img_src: PropTypes.string.isRequired,
  alt_txt: PropTypes.string.isRequired,
}

export default ModalImagePopUp;
