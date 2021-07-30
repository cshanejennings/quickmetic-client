import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

import {
  // Paper,
  Typography,
  Divider,
  Button,
} from '@material-ui/core/';

import {
  load_trials,
} from '../store/store.trial';

const get_styles = makeStyles(theme => ({
}));

const ReportPage = (props) => {
  const classes = get_styles();

  const {
    trials,
    load_trials,
    loading_trials,
  } = props;

  if (trials.length) {
    window.trials = trials;
  }

  const report = () => {
    const data = trials.map((t, i) => ({
      name: t.created_at.split('T')[0],
      percent: t.percent,
      elapsed: t.elapsed_time
    }));
    // https://codesandbox.io/s/recharts-area-chart-with-date-axis-6o55k?file=/src/DateArea.js:103-202
    // https://recharts.org/en-US/api/Legend
    return (trials.length) ? (
      <AreaChart width={730} height={250} data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={1}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={.5}/>
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#E45647" stopOpacity={1}/>
            <stop offset="95%" stopColor="#E45647" stopOpacity={.9}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend verticalAlign="top" height={36}/>
        <Area type="monotone" dataKey="percent" stroke="#82ca9d" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="elapsed" stroke="#E45647" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>
    ) : (loading_trials) ? (
      <Typography>Loading your records, please wait</Typography>
    ) : (
      <Button onClick={load_trials}>load</Button>
    )
  }


  return (
    <div>
      <Typography variant="h5">Reports</Typography>

      <Divider className={ classes.divider }/>
      { report() }
    </div>
  );
}

const mapStateToProps = state => { return {
  trials: state.trial.trials,
  loading_trials: state.trial.loading_trials,
} };

const mapDispatchToProps = (dispatch) => { return {
  load_trials: (data) => dispatch(load_trials()),
} };

export default connect( mapStateToProps, mapDispatchToProps )(ReportPage);
