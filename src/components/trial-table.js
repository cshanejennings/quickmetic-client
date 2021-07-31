import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  // Button,
  Typography,
} from '@material-ui/core/';

import CellEntry from './cell-entry';
import CellValue from './cell-value';
import CellType from './cell-type';

const get_styles = makeStyles(theme => ({
  root: {
    width: 260,
  },
  done: {
    background: '#47cacc',
    // marginBottom: 20
  },
}));

const TrialTable = (props) => {
  const classes = get_styles();

  const {
    trial,
    evaluate,
    on_focus,
    update,
  } = props;

  const { submitting_trial } = trial;
  const {
    entries,
    answers,
    header_values,
    row_values
  } = trial.data;

  const row_count = row_values.length;
  const column_count = header_values.length;

  const get_header = () => {
    return (
      <tr>
        <CellType type="addition"/>
        { header_values.map((v, c) => {
          return ( <CellValue key={ c } value={v} /> );
        }) }
      </tr>
    )
  }
  setTimeout(() => {
    if (!entries[0][0] && entries[0][0] !== 0) {
      document.getElementById(`answer_0-0`).focus();
    }
  })

  const on_update = (update_col, update_row, update_val) => {
    const new_entries = entries.map((row, row_index) => row.map((value, column_index) => {
      return (row_index === update_row && column_index === update_col) ? update_val : value;
    }));
    update(new_entries);
  }

  const get_row = (row, r) => {
    return (
      <tr key={ r }>
        <CellValue value={ row_values[r] }/>
        { header_values.map((v, c) => {
          return (
            <CellEntry key={ c }
              val={ entries[r][c] }
              answer={ answers[r][c] }
              update={ on_update }
              row={ r }
              col={ c }
              on_focus={ on_focus }
              />
          );
        }) }
      </tr>
    );
  }


  const ready = entries.reduce((pass, cells, row) => {
    const row_result = (cells.map((entry, col) => {
      return (entry === String(answers[row][col]))
    }).indexOf(false) === -1) ? true : false;
    return (row_result && pass);
  }, true);

  const handleKeyPress = (e, field) => {
    const focus = (r, c) => {
      document.getElementById(`answer_${r}-${c}`).focus();
    }
    if (e.target.id.indexOf('answer') === 0) {
      const r_c = e.target.id.split('_')[1].split('-');
      const row = parseInt(r_c[0], 10);
      const col = parseInt(r_c[1], 10);

      if (e.keyCode === 13) { // enter key
        if (ready) evaluate(answers);
        if (String(answers[row][col]) === entries[row][col]) {
          if (row < row_count - 1) focus(row + 1, col);
          else if (col <= column_count - 2) focus(0, col + 1);
        } else {
          on_update(col, row, '');
        }
      } else if (e.keyCode === 37) { // left key
        if (col > 0) focus(row, col - 1);
        else if (row > 0) focus(row - 1, column_count - 1);
      } else if (e.keyCode === 38) { // up key
        if (row > 0) focus(row - 1, col);
        else if (col > 0) focus(row_count - 1, col - 1);
      } else if (e.keyCode === 39) { // right key
        if (col <= column_count - 2) focus(row, col + 1);
        else if (row < row_count - 1) focus(row + 1, 0);
      } else if (e.keyCode === 40) { // down key
        if (row < row_count - 1) focus(row + 1, col);
        else if (col <= column_count - 2) focus(0, col + 1);
      }
    }
  }


  const get_table = () => {
    return (!submitting_trial) ? (
      <table className="trial">
        <thead>{ get_header() }</thead>
        <tbody onKeyDown={ handleKeyPress }>
          { row_values.map(get_row) }
        </tbody>
      </table>
    ) : (
      <Typography>Submitting Results</Typography>
    )
  }

  return (
    <div className={classes.root}>
    { get_table() }
    </div>
  );
}

TrialTable.propTypes = {
  trial: PropTypes.object.isRequired,
  position: PropTypes.shape(({
    row: PropTypes.number,
    col: PropTypes.number
  })),
  evaluate: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  on_focus: PropTypes.func.isRequired,
}

export default TrialTable;
