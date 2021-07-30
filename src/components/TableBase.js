import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core/';


const get_styles = makeStyles(theme => ({
  root: { width: '100%' },
  container: { maxHeight: 440 },
}));

const TableBase = (props) => {
  const classes = get_styles();
  const { headers, rows, get_row_cells, default_rows_per_page } = props;
  const [page, set_page] = React.useState(0);
  const [rows_per_page, set_rows_per_page] = React.useState(default_rows_per_page);

  const handle_change_rows_per_page = (event) => {
    set_rows_per_page(+event.target.value);
    set_page(0);
  };
  const handle_change_page = (e, new_page) => set_page(new_page);

  const start = page * rows_per_page;
  const end = page * rows_per_page + rows_per_page;

  const get_pagination = () => {
    return (default_rows_per_page !== rows.length) ? (
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={ rows.length }
        rowsPerPage={ rows_per_page }
        page={ page }
        onChangePage={ handle_change_page }
        onChangeRowsPerPage={ handle_change_rows_per_page }
      />
    ) : '';
  }

  const display_cell = (cell, key) => <TableCell key={key}>{cell}</TableCell>;
    return (
      <Fragment>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {headers.map((cell, key) => (
                  <TableCell key={ key } style={ cell.style }>{ cell.label }</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(start, end).map((row, key) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={ key }>
                    { get_row_cells(row, key + start).map(display_cell) }
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        { get_pagination() }

      </Fragment>
    );
}

TableBase.defaultProps = {
  default_rows_per_page: 10
}

TableBase.propTypes = {
  headers: PropTypes.array.isRequired,
  get_row_cells: PropTypes.func.isRequired,
  rows: PropTypes.array.isRequired,
  default_rows_per_page: PropTypes.number.isRequired,
}

export default TableBase;
