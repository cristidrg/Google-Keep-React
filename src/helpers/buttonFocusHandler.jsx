import React from 'react';
import PropTypes from 'prop-types';

const defaultProps = {
  ariaPressed: false,
};

const propTypes = {
  onInteraction: PropTypes.func.isRequired,
  ariaPressed: PropTypes.bool,
};

// Handles focus for buttons with inner contents
// I stopped using this method since I had to put a tabindex == -1 in the contents of my svg
// and had to wrap my button in this enhanced component
// The new focus handler is in /keep-clone/src/setupKeyboardFocus.js
// The problem is described here: http://kizu.ru/en/blog/keyboard-only-focus/#x
function buttonFocusHandler(Button) {
  class _EnhancedButton extends React.Component {
    constructor(props) {
      super(props);
      this.handleMouseDown = this.handleMouseDown.bind(this);
      this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    shouldComponentUpdate(nextProps) {
      return nextProps.ariaPressed !== this.props.ariaPressed;
    }

    handleMouseDown(event) {
      if (
        event.button === 0 &&
        (event.target.tagName === 'path' || event.target.tagName === 'svg')
      ) {
        this.props.onInteraction();
      } else {
        event.preventDefault();
      }
    }

    handleKeyDown(event) {
      if (event.keyCode === 13 || event.keyCode === 32) {
        // Prevent the default action to stop scrolling when space is pressed
        event.preventDefault();
        this.props.onInteraction();
      }
    }

    render() {
      return Button(Object.assign({}, this.props, {
        onMouseDown: this.handleMouseDown,
        onKeyDown: this.handleKeyDown,
      }));
    }
  }

  _EnhancedButton.propTypes = propTypes;
  _EnhancedButton.defaultProps = defaultProps;

  return _EnhancedButton;
}

export default buttonFocusHandler;
