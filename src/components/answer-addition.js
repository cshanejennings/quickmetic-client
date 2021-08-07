import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
} from '@material-ui/core/';

const cell = {
  width: '20px',
  height: '20px',
  lineHeight: '15px',
  fontSize: '44px',
  borderRadius: 15,
  overflow: 'hidden',
  textAlign: 'center',
  verticalAlign: 'middle',
  display: 'table-cell',
  background: '#F3F3F3'
  // background: '#535353',
}

const get_styles = makeStyles(theme => ({
  root: {

  },
  empty: { ...cell,
    background: '#eee'
  },
  first: { ...cell,
    color: '#faa'
  },
  second: { ...cell,
    color: '#5f5'
  }
}));

const AnswerAddition = (props) => {
  const classes = get_styles();
  const {
    first_number,
    second_number,
    width,
    height,
  } = props;
  // React.useEffect(() => { }, [ ]);
  // const [state_var, set_state_var] = React.useState(0)

  const cells = Array(height).fill(Array(width).fill(''))



  const get_row = (cells, row) => {
    const row_total = (row * width);
    const get_cell = (val, col) => {
      const value = row_total + col % width;
      return (value < first_number) ? (
        <td key={ `${row}_${col}` } className={ classes.first }> • </td>
      ) : (value < first_number + second_number ) ? (
        <td key={ `${row}_${col}` } className={ classes.second }> • </td>
      ) : <td key={ `${row}_${col}` }  className={ classes.empty } ></td>
    }
    return (
      <tr key={ row }>{ cells.map(get_cell)}</tr>
    )
  }

  return (
      <table className={ classes.root }>
        <tbody>
          { cells.map(get_row) }
        </tbody>
      </table>
  );
}

AnswerAddition.defaultProps = {
  width: 10,
  height: 2,
}

AnswerAddition.propTypes = {
  first_number: PropTypes.number.isRequired,
  second_number: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

export default AnswerAddition;
