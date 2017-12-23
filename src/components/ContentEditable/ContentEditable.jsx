import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Used to correct input caret position on paste
/**
 * @EVENT_HANDLING
 * On paste, we would like to simply keep the text plain, to remove any unwanted representations.
 * In addition, React seems to not update the caret position after a paste event.*  Inserting the
 * text via the insertHTML command will fix this.
 *
 * *I currently do not actually understand why this happens as the input event fires after the paste event finishes.
 * Any insight would be appreciated.
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
 * @REACT - @VDOM
 * This component abstracts common operations from a contentEditable div. ContentEditable
 * elements go head in head with React's VDOM. When one handles elements which make use
 * of such functionality they must ensure the invariant of keeping React's VDOM in sync
 * with the actual DOM values. Browser plugins or programming change of such elements will cause
 * input handlers to not fire, thus creating a disparity between the two DOMs.
 *
 * This component does not solve this invariant currently, as I would like to focus on other
 * parts on the project, however one can solve it by transforming it to a stateful component
 * and adding a check between it's DOM contents (via innerText/innerHTML) against the source of truth (Redux/State)
 * in the componentDidUpdate method. This will sync the DOMs on the component's next update, thus preventing a
 * fault in the reconciliation algorithm.
 *
 * @OPINIONATED
 * A recurring pattern throughout my codebase is the usage of the dynamicAttributes.
 * I believe that components should not bloat the html with attributes that they won't use in their
 * lifetime.
 */
const ContentEditable = (props) => {
  const dynamicAttributes = {
    className: props.className ? props.className : undefined,
    ref: props.setRef ? props.setRef : undefined,
    onInput: props.onInput ? props.onInput : undefined,
    onBlur: props.onBlur ? props.onBlur : props.onInput ? props.onInput : undefined,
    'data-placeholder': props.placeholder ? props.placeholder : undefined,
  };

  return (
    <div contentEditable suppressContentEditableWarning {...dynamicAttributes}>
      {props.data}
    </div>
  );
};

ContentEditable.propTypes = {
  className: PropTypes.string,
  data: PropTypes.string,
  onInput: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.func,
  setRef: PropTypes.func,
  ref: PropTypes.func,
};

export default ContentEditable;

export { ContentEditable, handlePaste };
