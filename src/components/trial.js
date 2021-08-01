import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import TrialTable from './trial-table';
import CountDown from './CountDown';

import {
  Grid,
  Typography,
} from '@material-ui/core/';


import {
  update_entries,
  submit_trial,
  update_countdown,
} from '../store/store.trial';

const get_styles = makeStyles(theme => ({
  root: {
    marginTop: 20,
    marginBottom: 20
  },
  formula: {
    textAlign: 'center',
  }
}));


// https://stackoverflow.com/questions/53090432/react-hooks-right-way-to-clear-timeouts-and-intervals
const Trial = (props) => {
  const {
    trial,
    update_entries,
    update_countdown,
    submit_trial,
  } = props;

  const {
    entries,
    answers,
    elapsed_time,
  } = trial.data;

  const {
    trial_time
  } = trial.settings;

  const classes = get_styles();
  React.useEffect(() => {
    setTimeout(() => {
      update_countdown({elapsed_time, trial_time});
    }, 1000);
  }, [ trial_time, elapsed_time, update_countdown ]);

  const [position, set_position] = React.useState({
    row: 0,
    col: 0,
    val: null,
  });

  const row_value = trial.data.row_values[position.row];
  const col_value = trial.data.header_values[position.col]

  const evaluate = (ans) => {
    const res = ans.reduce((r, cells, row) => {
      cells.forEach((val, col) => { r.total += 1;
        if (val === parseInt(entries[row][col])) {
          r.correct += 1;
        } });
      return r;
    }, { correct: 0, total: 0 });
    const percent = Math.floor((res.correct / res.total) * 100);
    const data = {
      type: trial.settings.type,
      header_digits: String(trial.settings.header_digits),
      row_digits: String(trial.settings.row_digits),
      height: String(trial.settings.height),
      width: String(trial.settings.width),
      negatives: 0,
      percent,
      trial_time: trial_time,
      elapsed_time: elapsed_time,
      correct: res.correct,
    };
    submit_trial(data);
  };
  const update = (entries) => {
    update_entries(entries);
  }

  const on_focus = (row, col, val) => {
    if ((String(answers[row][col]) !== val)) {
      update_entries(entries.map((r, r_index) => r.map((value, c_index) => {
        return (r_index === row && c_index === col) ? '' : value;
      })));
    }
    set_position({row, col, val});
  }


  return (
    <Grid className={ classes.root } container spacing={1}>
      <Grid item md={4} xs={12}>
        <Typography className={ classes.formula } variant="h3">{ row_value } + { col_value }</Typography>
        <CountDown
          width={ 240 }
          remaining={ trial_time - elapsed_time }
          percent={ elapsed_time / trial_time }
          elapsed={ elapsed_time }
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <TrialTable
          position={ position }
          trial={ trial }
          update={ update }
          evaluate={ evaluate }
          on_focus={ on_focus }
        />
      </Grid>
    </Grid>

  );
}

Trial.propTypes = {
  trial: PropTypes.object.isRequired,
}

const mapStateToProps = state => { return {
  trial:state.trial,
} };

const mapDispatchToProps = (dispatch) => { return {
  update_entries: (data) => dispatch(update_entries(data)),
  update_countdown: (data) => dispatch(update_countdown(data)),
  submit_trial: (data) => dispatch(submit_trial(data)),
} };

export default connect( mapStateToProps, mapDispatchToProps )(Trial);
