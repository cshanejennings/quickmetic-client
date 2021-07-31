import _ from 'lodash';

import {
  submit_trial_results,
} from '../util/laravel-api';

import { addition_test } from '../util/generate_test';

import {
  USER_EVENTS,
  TRIAL_EVENTS,
} from './events';

export const create_trial = (data) => (dispatch) => {
  const { header_values, row_values, answers, entries } = addition_test(data.settings);
  dispatch({
    type: TRIAL_EVENTS.CREATE_TRIAL,
    payload: {
      settings: data.settings,
      data: {
        header_values,
        row_values,
        answers,
        entries,
        elapsed_time: 0,
      }
    },
})};

export const update_trial = (data) => (dispatch) => {
  // data = header_digits, height, row_digits, trial_time, type, width;
  dispatch({
    type: TRIAL_EVENTS.UPDATE_TRIAL,
    payload: {
      settings: data
    },
})};

export const update_entries = (data) => (dispatch) => {
  dispatch({
    type: TRIAL_EVENTS.UPDATE_ENTRIES,
    payload: {
      entries: data
    },
})};

export const update_countdown = (data) => (dispatch) => {
  const {trial_time, elapsed_time} = data;
  const type = (trial_time - elapsed_time > 0)
   ? TRIAL_EVENTS.UPDATE_COUNTDOWN
   : TRIAL_EVENTS.COMPLETE_COUNTDOWN;
  dispatch({ type });
}

  export const submit_trial = (data) => (dispatch) => {
    const { TRIAL_SUBMITTING, TRIAL_SUBMITTED } = TRIAL_EVENTS;
    dispatch({type: TRIAL_SUBMITTING});
    submit_trial_results({trial: data}).then(response => { dispatch({
      type: TRIAL_SUBMITTED,
      payload: response.data
    })}).catch(e => { console.error(e); });
  }

const INITIAL_STATE = {
  loading_trials: false,
  submitting_trial: false,
  trials: [], // TODO change based on type
  settings: {
    width: 3,
    height: 3,
    trial_time: 300,
    row_digits: 1,
    header_digits: 1,
    type: 'subtraction',
  },
  data: {
    elapsed_time: 0,
    header_values: [],
    row_values: [],
    entries: [],
    answers: [],
  }

};

function reduce(state = INITIAL_STATE, action = {}) {
  const new_state = _.cloneDeep(state);


  switch (action.type) {
    // case USER_EVENTS.LOGIN_FAILURE: break;
    case USER_EVENTS.LOGGED_IN:
    case USER_EVENTS.UPDATED:
    case TRIAL_EVENTS.UPDATE_TRIAL:
      // settings: width, height, row_digits, header_digits, type, trial_time
      new_state.settings = {...action.payload.settings};
    break;
    case TRIAL_EVENTS.CREATE_TRIAL:
      // settings: width, height, row_digits, header_digits, type, trial_time
      new_state.settings = {...action.payload.settings};
      // data: elapsed_time, header_values, row_values, entries, answers
      new_state.data = {...action.payload.data };
    break;
    case TRIAL_EVENTS.UPDATE_ENTRIES:
      new_state.data.entries = action.payload.entries;
    break;
    case TRIAL_EVENTS.UPDATE_COUNTDOWN:
      new_state.data.elapsed_time += 1;
    break;
    case TRIAL_EVENTS.COMPLETE_COUNTDOWN:
      new_state.data.elapsed_time = 0;
    break;
    case TRIAL_EVENTS.SUBMIT_TRIAL:
      console.log('TRIAL_EVENTS.SUBMIT_TRIAL event');
    break;
    case TRIAL_EVENTS.TRIAL_SUBMITTING:
      new_state.submitting_trial = true;
    break;
    case TRIAL_EVENTS.TRIAL_SUBMITTED:
      new_state.submitting_trial = false;
      new_state.data = { ...INITIAL_STATE.data };
      new_state.trials.push(action.payload);
    break;
    default:;
  }
  return new_state;
}

export default function reduceWrapper(state, action) {
    var rv = reduce(state, action);
    return rv === state ? state : _.defaults(rv, state);
}
