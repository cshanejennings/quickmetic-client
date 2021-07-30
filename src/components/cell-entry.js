import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const get_styles = makeStyles(theme => ({
  correct: {
    background: '#EFE',
  },
  incorrect: {
    background: '#FEE',
  }
}));

const CellEntry = (props) => {
  const classes = get_styles();
    const { update, val, answer, col, row, on_focus } = props;

    const on_change = (e) => {
      const value = e.target.value;
      if (value === '-') {
          return update(col, row, value);
      }
      if (/^-?\d*\.?\d*$/.test(value)) {
        update(col, row, value);
      }
    }

    const focused = () => {
      on_focus(row, col, val);
    }

    const get_entry = () => {
      return (!val) ? (
        <input
          id={ `answer_${row}-${col}`}
          autoComplete="off"
          onFocus={ focused }
          value={ val }
          onChange={ on_change }
          type="text"
        />
      ) : ( val === String(answer) ) ? (
        <input className={ classes.correct }
          id={ `answer_${row}-${col}`}
          autoComplete="off"
          onFocus={ focused }
          value={ val }
          onChange={ on_change }
          type="text"
        />
      ) : (
        <input className={ classes.incorrect }
          id={ `answer_${row}-${col}`}
          autoComplete="off"
          onFocus={ focused }
          value={ val }
          onChange={ on_change }
          type="text"
        />
      )
    }

    return (
        <td className="entry">{ get_entry() }</td>
    );
}

CellEntry.propTypes = {
  update: PropTypes.func.isRequired,
  on_focus: PropTypes.func.isRequired,
  val: PropTypes.string.isRequired,
  answer: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
}

export default CellEntry;
