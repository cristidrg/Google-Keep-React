import React from 'react';
import PropTypes from 'prop-types';

const defaultProps = {
  disabled: false,
  icon: false,
};

const propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  ariaPressed: PropTypes.bool,
  onInteraction: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.element,
};

/**
 * @ACCESIBILITY
 * @EVENT_HANDLING
 * @FP -- FUNCTIONAL_COMPOSITION -- CURRY
 * This function is used to handle keystrokes on notecard buttons.
 * All of the buttons must activate when enter or space is pressed as per
 * W3C accesibility standards. When space is pressed, the browser default
 * behavior is to scroll down, thus if the button is focused, we must
 * prevent the scroll.
 */
const handleKeyDown = onInteraction => (event) => {
  if (event.keyCode === 13 || event.keyCode === 32) {
    // Prevent the default action to stop scrolling when space is pressed
    event.preventDefault();
    onInteraction.onInteraction();
  }
};

// @NOTE in the future, move the svg html to css background svg encoding
// to reduce html size.
const NoteButton = (props) => {
  const dynamicAttributes = {};
  if (props.icon) {
    dynamicAttributes.dangerouslySetInnerHTML = { __html: props.icon };
  }
  return (
    <div
      role="button"
      className={props.className}
      disabled={props.disabled}
      aria-label={props.ariaLabel}
      aria-pressed={props.ariaPressed}
      tabIndex="0"
      onClick={props.onInteraction}
      onKeyDown={handleKeyDown(props.onInteraction)}
      {...dynamicAttributes}
    >
      {props.children}
    </div>
  );
};

NoteButton.propTypes = propTypes;
NoteButton.defaultProps = defaultProps;

export default NoteButton;
