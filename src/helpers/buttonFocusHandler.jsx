import React from 'react';
import PropTypes from 'prop-types';

const defaultProps = {
  ariaPressed: false,
};

const propTypes = {
  onInteraction: PropTypes.func.isRequired,
  ariaPressed: PropTypes.bool,
};

/**
 * @REACT_BP  --- HOC
 * @ACCESIBILITY
 * @EVENT_HANDLING
 * 
 * Almost all of the buttons used in the app have a separate design for when they are focused via tab navigation and via
 * click/enter. Below is a component which made use of the tabIndex == -1 trick described here: http://kizu.ru/en/blog/keyboard-only-focus/#x
 * I stopped using this approach because I felt like I was unnecesarry oupting html just to solve this trick with pure css. Plus,
 * every button brought this extra component with it.
 * 
 * The approach I have now is in: /keep-clone/src/setupKeyboardFocus.js
 */ 
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
