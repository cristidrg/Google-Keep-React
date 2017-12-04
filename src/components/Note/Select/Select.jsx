import React from 'react';
import PropTypes from 'prop-types';

import './Select.css';

import select from './select.svg';
import strings from '../strings';

const propTypes = {
  ariaPressed: PropTypes.bool.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
};

const Select = props => (
  <div
    role="button"
    className="note-card__select"
    dangerouslySetInnerHTML={{ __html: select }}
    aria-label={strings.selectAria}
    aria-pressed={props.ariaPressed}
    tabIndex="0"
    onMouseDown={props.onMouseDown}
    onKeyDown={props.onKeyDown}
  />
);
Select.propTypes = propTypes;

export default Select;
