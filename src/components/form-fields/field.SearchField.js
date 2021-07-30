import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  IconButton,
  Paper,
  Divider,
  InputBase,
} from '@material-ui/core/';

import SearchIcon from '@material-ui/icons/Search';

const get_styles = makeStyles(theme => ({
  root: {},
  search_icon: {
    padding: 10,
  },
  search_divider: {
    height: 28,
    margin: 4,
  },
  search_input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  search_bar: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: 0
  },
}));

const Search = (props) => {
  const classes = get_styles()
  const { submit, placeholder, query, set_query, use_state } = props;
  const [val, set_val] = React.useState(query);

  if (query && val) set_val('');

  const handle_change = (e) => {
    if (use_state) set_val(e.target.value)
    else set_query(e.target.value);
  };

  const handle_submit = () => {
    const resp = (use_state) ? query : val;
    submit(resp);
  }

  const key_press = (e) => (e.keyCode === 13) ? handle_submit() : null;

  return (
    <Paper className={classes.search_bar}>
      <InputBase
        className={classes.search_input}
        placeholder={ placeholder }
        value={ (use_state) ? val : query }
        onChange={ handle_change }
        onKeyDown={ key_press }
        inputProps={{ 'aria-label': {placeholder} }}
      />
      <Divider className={classes.search_divider} orientation="vertical" />
      <IconButton
        onClick={ handle_submit }
        className={classes.search_icon}
        aria-label="search"
        >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

Search.defaultProps = {
  query: '',
  use_state: false,
  placeholder: 'Search',
}

Search.propTypes = {
  placeholder:PropTypes.string.isRequired,
  query: PropTypes.string,
  set_query: PropTypes.func,
  use_state: PropTypes.bool,
  submit: PropTypes.func.isRequired,
}

export default Search;
