import moment from 'moment';

const FMT = 'YYYY-MM-DD';
const ls = window.localStorage;

const get_offset = (str) => moment().diff(moment(str), 'd');

const apply_offset = (days) => moment().subtract(days, 'd').format(FMT);

export const set_relative_date_range = (date_range, name) => {
  ls[name] = JSON.stringify({
    start_date: get_offset(date_range.start_date),
    end_date: get_offset(date_range.end_date),
  });
}

export const get_relative_date_range = (name, def) => {
  const json = (ls[name]);
  try {
    const range = JSON.parse(json);
    return {
      start_date: apply_offset(range.start_date),
      end_date: apply_offset(range.end_date),
  }} catch (e) { return def; }
}

export const set_json = (json, name) => {
  ls[name] = JSON.stringify(json);
}

export const get_json = (name, def) => {
return (ls[name])
  ? JSON.parse(ls[name])
  : def;
}
