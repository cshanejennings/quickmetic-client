import React from 'react';
import PropTypes from 'prop-types';

const CellValue = (props) => {
  const { value } = props;
    return (
        <td className="num">{ value }</td>
    );
}

CellValue.propTypes = {
  value: PropTypes.number.isRequired
}

export default CellValue;
