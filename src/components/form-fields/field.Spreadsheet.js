import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  FormControl,
} from '@material-ui/core/';

import {
  // Visibility,
  // VisibilityOff,
} from '@material-ui/icons/';

import { DropzoneArea
 } from 'material-ui-dropzone'
import { load_files } from '../../util/file-reader';

const get_styles = makeStyles(theme => ({
  input_fields: {
    margin: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      margin: '1%',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '2%',
    },
  },
  no_attempt: {
    [theme.breakpoints.up('sm')]: {
      width: '90%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '96%',
    },
  },
  dropzone: {
    width: 400,
    height: 150,
    minHeight: 150,
  }
}));

const SpreadsheetField = (props) => {
  const classes = get_styles();

  const { children, file_limit, dropzone_text } = props;
  const { preprocess, parse_options, on_ready} = props;

  const handle_change = (input) => {
    // if (input && input.length) console.log({input});
    load_files(input, preprocess, parse_options)
      .then(on_ready)
      .catch((e) => { if (e) { console.error(e); } })
  }

  const drop_rejected = (files) => {
    files.forEach((file) => {
      console.error(`${file.name}: rejected. File Size: ${file.size} MimeType: ${file.type}`);
    });
  }

//       <InputLabel className={ classes.label } htmlFor="password_input">Password</InputLabel>
  const get_field = () => (children) ? children : (
    <DropzoneArea

      classes={ {root : classes.dropzone} }
      onChange={ handle_change }
      showAlerts={true}
      onDropRejected={ drop_rejected }
      dropzoneText={ dropzone_text }
      maxFileSize={ 5000000 }
      acceptedFiles={ [
        'text/plain',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'text/x-csv',
        'application/csv',
        'application/x-csv',
        'text/csv',
        'text/comma-separated-values',
        'text/x-comma-separated-values',
        'text/tab-separated-values',
        '',
      ] }
      filesLimit={ file_limit }
      />
  );

  return (
    <FormControl fullWidth className={ classes.input_fields } variant="outlined">
      { get_field() }
    </FormControl>
  );
}

SpreadsheetField.defaultProps = {
  dropzone_text: "Drop CSV file here.",
  file_limit: 1,
  parse_options: {
    skip_empty_lines: true,
    trim: true
  }
}

SpreadsheetField.propTypes = {
  file_limit: PropTypes.number.isRequired,
  parse_options: PropTypes.object,
  dropzone_text: PropTypes.string.isRequired,
  on_ready: PropTypes.func.isRequired,
  preprocess: PropTypes.func,
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ]),
}

export default SpreadsheetField;
