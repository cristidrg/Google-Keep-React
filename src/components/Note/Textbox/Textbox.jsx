import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Textbox.css';

import strings from '../strings';

const fontSizeTresholds = [[5, 29], [7, 50], [10, 116], [12, 150]];

const defaultProps = {
  note: '',
  takeANote: false,
};

const propTypes = {
  note: PropTypes.string,
  takeANote: PropTypes.bool,
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
    const textBoxClass = {
      'note-card__textbox': true,
      'note-card__textbox--take-note': this.props.takeANote,
    };

    if (this.props.takeANote) {
      return classNames(textBoxClass);
    }

    const characters = this.props.note.length;
    let noteText = this.props.note;
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

    return (
      <div
        role="textbox"
        className={textboxClass}
        dangerouslySetInnerHTML={{ __html: textboxText }}
        contentEditable={this.props.takeANote}
        {...(this.props.takeANote ? { 'data-placeholder': strings.takeANote } : {})}
      />
    );
  }
}

Textbox.propTypes = propTypes;
Textbox.defaultProps = defaultProps;

export default Textbox;
