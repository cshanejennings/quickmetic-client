import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  PieChart,
  Pie,
  Cell
} from 'recharts';

import {
} from '@material-ui/core/';

const get_styles = makeStyles(theme => ({
  root: {}
}));

const colors = [ '#76c8dc', '#dcf3f7' ];

const CountDown = (props) => {
  const classes = get_styles();
  const { elapsed, remaining, width } = props;

  const get_cell = (entry, index) => {
    return <Cell key={`cell-${index}`} fill={colors[index]}/>
  }

  const time = [{ value: remaining }, { value: elapsed }];

  const minutes = Math.floor(remaining / 60)
  const seconds = String((remaining % 60)).padEnd(2, '0');

  return (
      <div className={ classes.root }>
      <PieChart width={ width } height={ width }>
        <Pie
          data={ time }
          startAngle={ 90 }
          endAngle={ 450 }
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          isAnimationActive={false}
          fill="#76c8dc"
        >{ time.map(get_cell)}</Pie>
        <text textAnchor="middle" dominantBaseline="middle"
          x={ width / 2 }
          y={ width / 2 }
        >{`${minutes}:${seconds}`}</text>
      </PieChart>
      </div>
  );
}

CountDown.propTypes = {
  width: PropTypes.number.isRequired,
  elapsed: PropTypes.number.isRequired,
  remaining: PropTypes.number.isRequired,
}

export default CountDown;
