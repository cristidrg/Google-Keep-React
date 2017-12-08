import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Note.scss';

import Pin from './Pin';
import Select from './Select';
import Textbox from './Textbox';

const defaultProps = {
  title: '',
  note: '', // These should properly have newline characters and be already trimmed to under 400 characters
  takeANote: false,
  editMode: false,
};

const propTypes = {
  title: PropTypes.string,
  note: PropTypes.string,
  takeANote: PropTypes.bool,
  editMode: PropTypes.bool,
};

class Note extends Component {
  constructor() {
    super();
    this.state = {
      pinned: false,
      selected: false,
    };
  }

  render() {
    const noteCardClass = classNames({
      'note-card': true,
      'note-card-take-note': this.props.takeANote,
    });

    const titleClass = classNames({
      'note-card__title': true,
      invisible: this.props.title.length === 0,
    });

    const textBoxClass = classNames({
      'note-card-textbox': true,
    });

    // Future Redux Props
    const pinNote = () =>
      this.setState(prevState => ({
        pinned: !prevState.pinned,
      }));

    const selectNote = () => {
      this.setState(prevState => ({
        selected: !prevState.selected,
      }));
    };

    return (
      <div className={noteCardClass}>
        <Select ariaPressed={this.state.selected} onInteraction={selectNote} />
        <div className="note-card__container">
          <div className={titleClass}>{this.props.title}</div>
          <Pin ariaPressed={this.state.pinned} onInteraction={pinNote} />
          <Textbox takeANote={this.props.takeANote} note={this.props.note} />
          <div role="toolbar" className="note-card__toolbar">
            <div role="button" className="note-card__toolbar__remind" />
            <div role="button" className="note-card__toolbar__collaborator" />
            <div role="button" className="note-card__toolbar__color" />
            <div role="button" className="note-card__toolbar__image" />
            <div role="button" className="note-card__toolbar__archive" />
            <div role="button" className="note-card__toolbar__more" />
          </div>
          {this.props.takeANote
            ? [
              <div key={0} role="button" className="note-card__take-note__list" />,
              <div key={1} role="button" className="note-card__take-note__image" />,
              <div key={2} role="button" className="note-card__take-note__draw" />,
              ]
            : ''}
        </div>
      </div>
    );
  }
}

Note.propTypes = propTypes;
Note.defaultProps = defaultProps;

export default Note;
