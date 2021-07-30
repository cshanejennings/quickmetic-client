// https://youmightnotneed.com/lodash/

export const get = (obj, path, defValue) => {
  // If path is not defined or it has false value
  if (!path) return undefined;
  // Check if path is string or array. Regex : ensure that we do not have '.' and brackets.
  // Regex explained: https://regexr.com/58j0k
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)
  // Find value if exist return otherwise return undefined value;
  return (
    pathArray.reduce((prevObj, key) => prevObj && prevObj[key], obj) || defValue
  )
}

export const zipObject = (keys, values) =>
  keys.reduce((acc, key, idx) => {
    acc[key] = values[idx]
    return acc
  }, {})

// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_keyBy
export const keyBy = (array, key) => (array || []).reduce((r, x) => ({ ...r, [key ? x[key] : x]: x }), {});
export const keyByLC = (array, key) => (array || []).reduce((r, x) => { return ({ ...r,
  [key ? (typeof x[key] === 'string') ? x[key].toLowerCase() : x[key] : x]: x
})}, {});

export const groupBy = (arr, key) => arr.reduce((grouped, val, i, a, k = val[key]) => (
  {...grouped, [k]: [...(grouped[k] || []), val] }
), {});

export const last = (arr) => arr[arr.length - 1];

export const json_clone = (obj) => JSON.parse(JSON.stringify(obj));


export const get_date_range = dates => dates.reduce((range, d) => ({
    start_date: (!range.start_date || range.start_date > d) ? d : range.start_date,
    end_date: (!range.end_date || range.end_date < d) ? d : range.end_date,
}), { start_date: '', end_date: ''});

const api = {
  get,
  get_date_range,
  groupBy,
  keyBy,
  keyByLC,
  last,
};

export default api;


console.log([['name','code','size','cost','msrp'], ...[...document.querySelectorAll('table')].reduce((rows, tbl, tbl_index) => {
    const cols = 5;
    // create an array of rows
    const new_rows = [...tbl.querySelectorAll('tr')].reduce((tbl_rows, r, row_index) => {
      // make each row an array of cells, but omit the first row because it's a
      // header which we don't use
      const row = (row_index) ? [...r.querySelectorAll('td')].map(c => c.textContent.trim()).filter(c => c.length) : [];
      return [...tbl_rows, row];
    }, []);
    console.log(tbl_index, new_rows.length, rows.length);
    return [
      ...rows,
      // This step removes odd cases where table cells are in the info table,
      // but not the pricing table.  I'm ensuring all cells are occupied before
      // adding the row to the master price list
      ...new_rows
    ];
  return rows;
}, [])]
  // remove rows with one cell
  .filter(r => (r.length))
  // join cells on tab character for pasting into spreadsheet
  .map(r => r.join('\t'))
  // join rows on newline
  .join('\n')
);




console.log([['Code','UPC','name','cost','msrp'], ...[...document.querySelectorAll('table')].reduce((rows, tbl, tbl_index) => {
  // Tables alternate between info and pricing tables with info first, followed
  // by pricing.
  if (tbl_index%2 === 0) { // %2 == 0 means the table is an info table
    // create an array of rows
    const new_rows = [...tbl.querySelectorAll('tr')].map((r, row_index) => {
      // make each row an array of cells, but omit the first row because it's a
      // header which we don't use
      return (row_index) ? [...r.querySelectorAll('td')].map(c => c.textContent.trim()) : [];
    });
    return [
      ...rows,
      // This step removes odd cases where table cells are in the info table,
      // but not the pricing table.  I'm ensuring all cells are occupied before
      // adding the row to the master price list
      ...new_rows.filter(cells => cells
        .reduce((keep, c) => { return (keep) ? c.length : false; }, true))
    ];
  } else { // %2 == 1 means the table is a pricing table
    // create an array of rows from the pricing table and match them with the
    // rows from the invoice table
    [...tbl.querySelectorAll('tr')].forEach((r, tbl_row_index, tbl_rows) => {
      // omit the header row
      if (!tbl_row_index) return;
      // calculate which info row to match the pricing row with
      const row_index = rows.length - (tbl_rows.length - tbl_row_index);
      // calculate which info row to match the pricing row with
      const cells = [...r.querySelectorAll('td')].map(c => c.textContent.trim());
      // join the two sets of cells into a single row
      const row = [...rows[row_index], ...cells];
      // replace the info row with the info / pricing row
      rows[row_index] = row;
    });
  }
  return rows;
}, [])]
  // remove rows with one cell
  .filter(r => (r.length))
  // join cells on tab character for pasting into spreadsheet
  .map(r => r.join('\t'))
  // join rows on newline
  .join('\n')
);
