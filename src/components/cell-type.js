import React from 'react';
import PropTypes from 'prop-types';

const CellType = (props) => {
  const { type } = props;

  const symbol = () => {
    switch(type) {
      case 'addition': return '+';
      case 'subtraction': return '-';
      case 'multiplication': return '&#215;';
      case 'division': return '&divide;';
      default: return '';
    }
  }
    return (
        <td className="num">{ symbol() }</td>
    );
}

CellType.propTypes = {
  type: PropTypes.oneOf([
    'addition',
    'subraction',
    'multiplication',
    'division',
  ]),
}

export default CellType;
