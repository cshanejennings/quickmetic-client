import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
} from '@material-ui/core/';

const get_styles = makeStyles(theme => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(1),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2),
    },
    maxWidth: 800,
  }
}));

const TabPanel = (props) => {
  const classes = get_styles();
  const { children, value, index, ...other } = props;
  // React.useEffect(() => { }, [ ]);
  // const [state_var, set_state_var] = React.useState(0)

  return (
    <div
      className={ classes.root }
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}

TabPanel.defaultProps = {
  message: '',
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabPanel;
