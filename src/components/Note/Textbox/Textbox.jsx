import React from 'react';
import PropTypes from 'prop-types';

import './Textbox.css';

const fontSizeTresholds = [[5, 29], [7, 50], [10, 116], [12, 150]];

const defaultProps = {
  note: '',
};

const propTypes = {
  note: PropTypes.string,
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

    return `note-card__textbox note-card__textbox--font-size-${fontSizeNo}`;
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
      />
    );
  }
}

Textbox.propTypes = propTypes;
Textbox.defaultProps = defaultProps;

export default Textbox;
