import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  Button,
  Grid,
} from '@material-ui/core/';

import {
  ArrowDropDown,
  ArrowDropUp,
} from '@material-ui/icons/';

import JaneReportSelectionDialog from './dialogs/JaneReportSelectionDialog';

const get_styles = makeStyles(theme => ({
  jane_report: {
    marginLeft: 10
  }
}));

const DateFilter = (props) => {
  const classes = get_styles();
  const { date_range, update, children, options } = props;

  const [open, set_open] = React.useState(false);
  const toggle = () => set_open(!open);

  const dialog = (open) ? (
    <JaneReportSelectionDialog
      toggle={ toggle }
      date_range={ date_range }
      update={ (range) => { set_open(false); update(range) } }
    >{ options }</JaneReportSelectionDialog>
  ) : '';

  const { start_date, end_date } = date_range;
  const date_display = `${start_date} - ${end_date}`;

  const status_tick = (open)
    ? <ArrowDropUp className={ classes.menu_tick }/>
    : <ArrowDropDown  className={ classes.menu_tick }/>;

  const toggle_btn = (
    <Button className={ classes.enable } onClick={ toggle }>
      { date_display } { status_tick }
    </Button>
  );


    return (
      <Grid className={ classes.root } justify="space-between" container>
        <Grid item sm={8} xs={12}>
          { children }
          { dialog }
        </Grid>
        <Grid item sm={4} xs={12} align="right">{ toggle_btn }</Grid>
      </Grid>

    );
}

DateFilter.defaultProps = {
  message: '',
}

DateFilter.propTypes = {
  date_range: PropTypes.shape({
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
  }),
  update: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
}

export default DateFilter;
