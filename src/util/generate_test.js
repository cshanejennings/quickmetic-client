//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = (arr) => {
  let ci = arr.length,  ri;
  while (0 !== ci) {
    ri = Math.floor(Math.random() * ci);
    ci--;
    [arr[ci], arr[ri]] = [arr[ri], arr[ci]];
  }
  return arr;
}

const randomInt = (min, max) => { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const get_number = (digits) => {
  return parseFloat(Array(digits).fill('').map((d, i) => {
    return (i) ? randomInt(0, 9) : randomInt(1, 9);
  }).join(''), 10);
}

const increment_row = (ones) => {
  return ((ones + 3) % 10) ? (ones + 3) % 10 : 3;
};

const get_number_array = (digits) => {
  const min = parseInt("1".padEnd(digits, "0"), 10);
  const max = parseInt("9".padEnd(digits, "9"), 10);
  const len = max - min + 1;
  return shuffle(Array(len).fill('').map((v,i) => i + min));
}

const get_rows = ({ height, row_digits}) => {
  const col0 = get_number(row_digits);

  const cols = Array(height).fill('').reduce((data, v, i) => {
    if(!i) return data;
    data.ones = increment_row(data.ones);
    const val = Math.floor(get_number(row_digits) / 10) * 10 + data.ones;
    return { ones: data.ones, arr: [...data.arr, val] };
  }, { arr: [col0], ones: col0 % 10 });
  return cols.arr;
}



const get_header = ({ width, header_digits}) => {
  const all_numbers = get_number_array(header_digits);
  return Array(width).fill('')
    .map((v) => all_numbers.pop());
}

// 2 by 1 = col_digits x header_digits
//     1  2  3
// 54 55 56 57
// 37
// 23

export const addition_test = (params) => {
  const header_values = get_header(params); // top row
  const row_values = get_rows(params); // left column
  const entries = Array(row_values.length).fill('')
    .map(ignore => Array(header_values.length).fill(''));
  const answers = entries.map(
    (ignore, r) => header_values.map(h => h + row_values[r])
  );

  return {
    header_values,
    row_values,
    entries,
    answers,
  }
}
