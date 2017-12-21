import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Used to correct input caret position on paste
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

const ContentEditable = (props) => {
  const dynamicAttributes = {
    className: props.className ? props.className : undefined,
    ref: props.setRef ? props.setRef : undefined,
    onInput: props.onInput ? props.onInput : undefined,
    onBlur: props.onBlur ? props.onBlur : props.onInput ? props.onInput : undefined,
    'data-placeholder': props.placeholder ? props.placeholder : undefined,
  };

  return (
    <div
      contentEditable
      suppressContentEditableWarning // Google Translate/Plugins will break this obv.
      onPaste={handlePaste}
      {...dynamicAttributes}
    >
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
