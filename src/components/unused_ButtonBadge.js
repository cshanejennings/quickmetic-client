import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  Button,
  Typography,
  Badge
}  from '@material-ui/core/';


const get_styles = makeStyles(theme => ({
  fab: { margin: theme.spacing(1) },
  panelButton: { marginRight: 20 },
  badge: {
    top: '15%',
    right: -3,
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
}));

const ButtonBadge = (props) => {
  const classes = get_styles();
  const { label, icon, count, onClick } = props;
  useEffect(() => { }, [ ]);

  return (count > 0) ? (
    <Button onClick={ onClick } className={ classes.fab } >
      <Badge className={ classes.panelButton } badgeContent={ count } color="secondary">
        { icon }
      </Badge>
      <Typography>{ label }</Typography>
    </Button>
  ) : '';
}

ButtonBadge.defaultProps = {
  count: 0,
  label: '',
  display: true,
  onClick: () => { console.log('onclick called')}
}

ButtonBadge.propTypes = {
  count: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  display: PropTypes.bool.isRequired,
  icon: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ]).isRequired
}

export default ButtonBadge;
