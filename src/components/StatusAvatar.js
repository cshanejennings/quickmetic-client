import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  ListItemAvatar,
  Avatar,
} from '@material-ui/core/';

import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

const get_styles = makeStyles(theme => ({
  root: {}
}));

const StatusAvatar = (props) => {
  const classes = get_styles();

  const status_icon = (status) => {
    switch (status) {
      case 'paid':
        return <AttachMoneyIcon />;
      case 'unpaid':
      case 'partially_paid':
          return <CreditCardIcon />
      case 'no_charge':
      case 'partially_paid_and_written_off':
          return <MoneyOffIcon />
      case 'refunded':
          return <KeyboardReturnIcon />
      case 'unmatched':
          return <CancelIcon />
      case 'remove':
          return <DeleteIcon />
      default:
          return ''
    }
  }
  const { status } = props;
    return (
        <ListItemAvatar className={classes.root}>
          <Avatar>
            { status_icon(status) }
          </Avatar>
        </ListItemAvatar>
    );
}

StatusAvatar.defaultProps = {
  message: '',
}

StatusAvatar.propTypes = {
  status: PropTypes.string.isRequired,
}

export default StatusAvatar;
