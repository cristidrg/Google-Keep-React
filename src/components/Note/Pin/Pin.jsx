import React from 'react';
import PropTypes from 'prop-types';

import './Pin.css';

import pin from './pin.svg';
import strings from '../strings';

const propTypes = {
  ariaPressed: PropTypes.bool.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
};

const Pin = props => (
  <div
    role="button"
    className="note-card__pin"
    dangerouslySetInnerHTML={{ __html: pin }}
    aria-label={strings.pinAria}
    aria-pressed={props.ariaPressed}
    tabIndex="0"
    onMouseDown={props.onMouseDown}
    onKeyDown={props.onKeyDown}
  />
);

Pin.propTypes = propTypes;

export default Pin;
