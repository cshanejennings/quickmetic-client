export const parse_reports = (ungrouped) => {
  return ungrouped.reduce((grouped, trial) => {
    grouped[trial.type].push(trial);
    return grouped;
  }, {
    addition: [],
    subtraction: [],
    multiplication: [],
    division: []
  });
}

export const add_report = (grouped, trial) => {
  const type = [...grouped[trial.type], trial];
  return {...grouped, [trial.type]: type }
}
