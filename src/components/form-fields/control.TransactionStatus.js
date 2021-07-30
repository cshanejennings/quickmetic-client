import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
} from '@material-ui/core/';

import StatusAvatar from '../StatusAvatar';
import VisibilityIcon from '@material-ui/icons/Visibility';

const get_styles = makeStyles(theme => ({
  root: {}
}));

const TransactionStatus = (props) => {
  const classes = get_styles();

  const {  label, status, preview, children } = props;

    return (
      <ListItem className={ classes.root }>
        <StatusAvatar status={ status } />
        <ListItemText>{  label }</ListItemText>
        <ListItemSecondaryAction>
          { children }
          <Button onClick={ preview } edge="end" aria-label="delete">
            <VisibilityIcon />
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    );
}

TransactionStatus.defaultProps = {
  label: '',
  children: '',
  status: '',
}

TransactionStatus.propTypes = {
  label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ]),
  status: PropTypes.string,
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ]),
}

export default TransactionStatus;
