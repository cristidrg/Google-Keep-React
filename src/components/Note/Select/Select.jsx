import React from 'react';
import PropTypes from 'prop-types';

import './Select.css';

import select from './select.svg';
import strings from '../../../strings';

const propTypes = {
  ariaPressed: PropTypes.bool.isRequired,
  onInteraction: PropTypes.func.isRequired,
};

const handleKeyDown = onInteraction => (event) => {
  if (event.keyCode === 13 || event.keyCode === 32) {
    // Prevent the default action to stop scrolling when space is pressed
    event.preventDefault();
    onInteraction();
  }
};

const Select = props => (
  <div
    role="button"
    className="note-card__select"
    dangerouslySetInnerHTML={{ __html: select }}
    aria-label={strings.selectAria}
    aria-pressed={props.ariaPressed}
    tabIndex="0"
    onMouseDown={props.onInteraction}
    onKeyDown={handleKeyDown(props.onInteraction)}
  />
);

Select.propTypes = propTypes;

export default Select;
