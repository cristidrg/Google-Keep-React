import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Used to correct input caret position on paste
/**
 * @EVENT_HANDLING
 * On paste, we would like to simply keep the text plain, to remove any unwanted representations and html style.
 * In addition, React seems to not update the caret position after a paste event.*  Inserting the
 * text via the insertHTML command will fix this.
 *
 * *I currently do not actually understand why this happens as the input event fires after the paste event finishes.
 * Any insight would be appreciated.
 *  
 * UPDATE: I fixed my component to not depend on the trick to correctly position the correct. I forcefully update
 * the component if it's out of sync.
 *  I also moved this function inside the component the class, initially it was stateless.
 */
const handlePaste = function (event) {
  event.preventDefault();
  let text = '';
  if (event.clipboardData && event.clipboardData.getData) {
    text = event.clipboardData.getData('text/plain');
  } else if (window.clipboardData && window.clipboardData.getData) {
    text = window.clipboardData.getData('Text');
  }
  document.execCommand('insertHTML', false, text);
};

/**
 * @REACT_BP - @VDOM
 * This component abstracts common operations from a contentEditable div. ContentEditable
 * elements go head in head with React's VDOM. When one handles elements which make use
 * of such functionality they must ensure the invariant of keeping React's VDOM in sync
 * with the actual DOM values. Browser plugins or programming change of such elements will cause
 * input handlers to not fire, thus creating a disparity between the two DOMs.
 *
 * Checking between the DOM contents against the source of truth in the componentDidUpdate method
 * keeps the DOM in sync with the VDOM after the next update, thus preventing a
 * fault in the reconciliation algorithm.
 *
 * @OPINIONATED
 * A recurring pattern throughout my codebase is the usage of the dynamicAttributes.
 * I believe that components should not bloat the html with attributes that they won't use in their
 * lifetime.
 */
class ContentEditable extends Component {
  constructor(props) {
    super(props);
    this.div = null;
    this.lastText = null;
    this.setRef = this.setRef.bind(this);
    this.emitChange = this.emitChange.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.text !== this.div.innerText;
  }

  componentDidUpdate() {
    if (this.props.text !== this.div.innerText) {
      this.div.innerText = this.props.text;
    }
  }

  setRef(node) {
    this.div = node;
  }

  handlePaste(event) {
    event.preventDefault();
    let text = '';
    if (event.clipboardData && event.clipboardData.getData) {
      text = event.clipboardData.getData('text/plain');
    } else if (window.clipboardData && window.clipboardData.getData) {
      text = window.clipboardData.getData('Text');
    }
    document.execCommand('insertHTML', false, text);
  }

  emitChange() {
    const text = this.div.innerText;
    if (this.props.onInput && text !== this.lastText) {
      this.props.onInput({
        target: {
          value: text,
        },
      });
    }
    this.lastText = text;
  }

  render() {
    const dynamicAttributes = {
      onBlur: this.props.onBlur ? this.props.onBlur : this.emitChange,
      'data-placeholder': this.props.placeholder ? this.props.placeholder : undefined,
    };
    return (
      <div
        contentEditable
        ref={this.setRef}
        onInput={this.emitChange}
        onPaste={this.handlePaste}
        className={this.props.className}
        suppressContentEditableWarning
        {...dynamicAttributes}
      >
        {this.props.text}
      </div>
    );
  }
}

ContentEditable.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  onInput: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.func,
  setRef: PropTypes.func,
  ref: PropTypes.func,
};

export default ContentEditable;

export { ContentEditable, handlePaste };
