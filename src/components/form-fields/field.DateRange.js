import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';

// https://github.com/jungsoft/materialui-daterange-picker#readme
import { DateRangePicker } from "materialui-daterange-picker"

import {
} from '@material-ui/core/';

const get_styles = makeStyles(theme => ({
  root: {
    // DO NOT TOUCH THIS
    // This allows the search bar to work as well as the
    // calendar, there is some kind of blocker div preventing
    // events above the calendar from touching the dom
    '& > div:first-child > div:first-child' : {
      pointerEvents: 'none',
    },
  }
}));

const DateRange = React.memo((props) => {
  const classes = get_styles();
  const { date_range, toggle, update } = props;
  const { start_date, end_date, min_date, max_date } = date_range;

  const handle_change = (r) => update({ ...date_range,
    start_date: moment(r.startDate).format('YYYY-MM-DD'),
    end_date: moment(r.endDate).format('YYYY-MM-DD'),
  });
  
  const maxDate = max_date || moment().format('YYYY-MM-DD');
    return (
      <div className={ classes.root }>
        <DateRangePicker
          open={ true }
          closeOnClickOutside={ false }
          initialDateRange={ {
            startDate: start_date,
            endDate: end_date,
          } }
          maxDate={ maxDate }
          minDate={ min_date }
          toggle={ toggle }
          onChange={ handle_change }
        />
      </div>
    );
});

DateRange.propTypes = {
  toggle: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  date_range: PropTypes.shape({
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
    max_date: PropTypes.string,
    min_date: PropTypes.string,
  }).isRequired,
}

export default DateRange;
