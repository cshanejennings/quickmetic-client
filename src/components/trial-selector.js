import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import {
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button
} from '@material-ui/core/';

import {
  create_trial,
  update_trial,
} from '../store/store.trial';

// import Icon from '@material-ui/core/Icon';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';

const get_styles = makeStyles(theme => ({
  root: {},
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const TrialSelector = (props) => {
  const classes = get_styles();
  const { update_values, get_trial, trial } = props;
  const {
    header_digits,
    row_digits,
    type,
    // width,
    // height,
  } = trial.settings;

  const handleEnter = (e) => (e.keyCode === 13) ? get_trial(trial) : null;

  React.useEffect(() => {
    document.addEventListener("keydown", handleEnter, false);
    return () => {
      document.removeEventListener("keydown", handleEnter, false);
    };
  });

  const update = (key, val) => {
    update_values({...trial.settings, [key] : val });
  }

  const update_header_digits = (e) => update('header_digits', e.target.value);
  const update_row_digits = (e) => update('row_digits', e.target.value);
  const update_type = (e) => update('type', e.target.value);
  // const update_width = (e) => update('width', e.target.value);
  // const update_height = (e) => update('height', e.target.value);
  // const get_dimensions_settings = () => {
  //   return (
  //     <Grid item md={3} xs={12}>
  //     <FormControl className={classes.formControl}>
  //       <InputLabel id="width-label">Table Width</InputLabel>
  //       <Select labelId="width-label" id="width"
  //         value={ width }
  //         onChange={ update_width }
  //       >
  //         <MenuItem value={3}>3</MenuItem>
  //         <MenuItem value={4}>4</MenuItem>
  //         <MenuItem value={5}>5</MenuItem>
  //       </Select>
  //     </FormControl>
  //     </Grid>
  //     <Grid item md={9} xs={12}>
  //     <FormControl className={classes.formControl}>
  //       <InputLabel id="height-label">Table Height</InputLabel>
  //       <Select labelId="height-label" id="height"
  //         value={ height }
  //         onChange={ update_height }
  //       >
  //         <MenuItem value={3}>3</MenuItem>
  //         <MenuItem value={4}>4</MenuItem>
  //         <MenuItem value={5}>5</MenuItem>
  //         <MenuItem value={6}>6</MenuItem>
  //         <MenuItem value={7}>7</MenuItem>
  //         <MenuItem value={8}>8</MenuItem>
  //       </Select>
  //     </FormControl>
  //     </Grid>
  //   );
  // }

    return (
      <Grid className={ classes.root } container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4">Math Trial Settings</Typography>
        </Grid>
        <Grid item md={3} xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="header-digits-label">Header Digits</InputLabel>
            <Select labelId="header-digits-label" id="header-digits"
              value={ header_digits }
              onChange={ update_header_digits }
            >
              <MenuItem value={1}>one</MenuItem>
              <MenuItem value={2}>two</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={9} xs={12}>
        <FormControl className={classes.formControl}>
          <InputLabel id="row-digits-label">Row Digits</InputLabel>
          <Select labelId="row-digits-label" id="row-digits"
            value={ row_digits }
            onChange={ update_row_digits }
          >
            <MenuItem value={1}>one</MenuItem>
            <MenuItem value={2}>two</MenuItem>
            <MenuItem value={3}>three</MenuItem>
          </Select>
        </FormControl>
        </Grid>

        <Grid item md={3} xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="type-label">Type</InputLabel>
            <Select labelId="type-label" id="type"
              value={ type }
              onChange={ update_type }
            >
              <MenuItem value={"addition"}>Addition</MenuItem>
              <MenuItem value={"subtraction"}>Subtraction</MenuItem>
              <MenuItem value={"multiplication"}>Multiplication</MenuItem>
              <MenuItem value={"division"}>Division</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={9} xs={12}>
        <Button
          id="start_trial"
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<PlayCircleFilled />}
          onClick={ () => get_trial(trial) }
        >
          Start
        </Button>
        </Grid>
      </Grid>
    );
}

TrialSelector.propTypes = {
  message: PropTypes.string,
}

const mapStateToProps = state => { return {
  trial: state.trial,
} };

const mapDispatchToProps = (dispatch) => { return {
  get_trial: (data) => dispatch(create_trial(data)),
  update_values: (data) => dispatch(update_trial(data)),
} };

export default connect( mapStateToProps, mapDispatchToProps )(TrialSelector);
