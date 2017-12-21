import React from 'react';
import PropTypes from 'prop-types';

import './Pin.css';

import pin from './pin.svg';
import strings from '../../../strings';

const propTypes = {
  ariaPressed: PropTypes.bool.isRequired,
  onInteraction: PropTypes.func.isRequired,
};

const handleKeyDown = onInteraction => (event) => {
  if (event.keyCode === 13 || event.keyCode === 32) {
    // Prevent the default action to stop scrolling when space is pressed
    event.preventDefault();
    onInteraction.onInteraction();
  }
};

const Pin = props => (
  <div
    role="button"
    className="note-card__pin"
    dangerouslySetInnerHTML={{ __html: pin }}
    aria-label={strings.pinAria}
    aria-pressed={props.ariaPressed}
    tabIndex="0"
    onClick={props.onInteraction}
    onKeyDown={handleKeyDown(props.onInteraction)}
  />
);

Pin.propTypes = propTypes;

export default Pin;
