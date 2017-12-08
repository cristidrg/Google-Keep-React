import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Textbox.css';

import strings from '../strings';

const fontSizeTresholds = [[5, 29], [7, 50], [10, 116], [12, 150]];

const defaultProps = {
  note: '',
  editable: false,
};

const propTypes = {
  note: PropTypes.string,
  editable: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
};

class Textbox extends React.Component {
  constructor(props) {
    super(props);
    this.getTextboxClass = this.getTextboxClass.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    // So fast, So optimized, Wow
    return nextProps.note.length !== this.props.note.length && nextProps.note !== this.props.note;
  }

  getTextboxClass() {
    let noteText = this.props.note;
    const characters = this.props.note.length;
    const textBoxClass = {
      'note-card__textbox': true,
      'note-card__textbox--editable': this.props.editable,
    };
    if (noteText.length > 400) {
      // Substringing should be handled in mapStateToProps
      noteText = `${noteText.substring(0, 400)}...`;
    }

    const maxWordLength = noteText
      .replace(/\n/g, ' ')
      .split(' ')
      .map(word => word.length)
      .reduce((acc, word) => (acc > word ? acc : word));

    let fontSizeNo = fontSizeTresholds.findIndex(tuple => tuple[0] > maxWordLength && tuple[1] > characters);

    if (fontSizeNo === -1) {
      fontSizeNo = 3;
    }

    textBoxClass[`note-card__textbox--font-size-${fontSizeNo}`] = true;
    return classNames(textBoxClass);
  }

  render() {
    const textboxClass = this.getTextboxClass();
    // Substringing should be handled in mapStateToProps
    const textboxText = this.props.note
      .substring(0, 400)
      .split(/\r\n|\r|\n/g)
      .join('<br >');

    const dynamicAttribs = {
      onClick: this.props.onClick ? this.props.onClick : undefined,
      onKeyDown: this.props.onKeyDown ? this.props.onKeyDown : undefined,
      'data-placeholder': this.props.editable ? strings.takeANote : undefined,
    };

    return (
      <div
        role="textbox"
        className={textboxClass}
        dangerouslySetInnerHTML={{ __html: textboxText }}
        contentEditable={this.props.editable}
        {...dynamicAttribs}
      />
    );
  }
}

Textbox.propTypes = propTypes;
Textbox.defaultProps = defaultProps;

export default Textbox;
