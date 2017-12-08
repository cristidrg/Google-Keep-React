import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Note.scss';

import Pin from './Pin';
import Select from './Select';
import Textbox from './Textbox';

import strings from './strings';

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
  constructor(props) {
    super(props);
    this.state = {
      pinned: false,
      selected: false,
      takeNoteExpand: false,
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.takeNoteExpand = this.takeNoteExpand.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.setNodeRef = this.setNodeRef.bind(this);
    this.takeANote = this.props.takeANote; // takeANote prop shouldn't change during lifetime
  }

  componentDidMount() {
    if (this.takeANote) {
      document.addEventListener('mousedown', this.handleClickOutside);
    }
  }

  componentWillUnmount() {
    if (this.takeANote) {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
  }

  setNodeRef(node) {
    this.nodeRef = node;
  }

  handleClickOutside(event) {
    if (this.state.takeNoteExpand && this.nodeRef && !this.nodeRef.contains(event.target)) {
      this.setState(() => ({
        takeNoteExpand: false,
      }));
    }
  }

  takeNoteExpand() {
    this.setState(() => ({
      takeNoteExpand: true,
    }));
  }

  renderTextBox(editMode) {
    let dynamicAttributes = {};
    if (this.props.takeANote) {
      dynamicAttributes = {
        onClick: this.takeNoteExpand,
        onKeyDown: this.takeNoteExpand,
      };
    }

    return (
      <Textbox
        editable={this.props.takeANote || editMode}
        note={this.props.note}
        {...dynamicAttributes}
      />
    );
  }

  renderTitle(editMode) {
    const titleClass = classNames({
      'note-card__title': true,
      invisible: this.props.title.length === 0 && !editMode,
    });
    const dynamicAttributes = {
      'data-placeholder': editMode ? strings.title : undefined,
    };

    return (
      <div contentEditable={editMode} className={titleClass} {...dynamicAttributes}>
        {this.props.title}
      </div>
    );
  }

  render() {
    const editMode = this.props.editMode || this.state.takeNoteExpand;

    const noteCardClass = classNames({
      'note-card': true,
      'note-card--take-note': this.props.takeANote && !editMode,
      'note-card--edit-note': this.props.editMode || editMode,
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
      <div className={noteCardClass} ref={this.setNodeRef}>
        <Select ariaPressed={this.state.selected} onInteraction={selectNote} />
        <div className="note-card__container">
          {this.renderTitle(editMode)}
          <Pin ariaPressed={this.state.pinned} onInteraction={pinNote} />
          {this.renderTextBox(editMode)}
          <div role="toolbar" className="note-card__toolbar">
            <div role="button" className="note-card__toolbar__remind" />
            <div role="button" className="note-card__toolbar__collaborator" />
            <div role="button" className="note-card__toolbar__color" />
            <div role="button" className="note-card__toolbar__image" />
            <div role="button" className="note-card__toolbar__archive" />
            <div role="button" className="note-card__toolbar__more" />
            {editMode
              ? [
                <div
                  key={0}
                  role="button"
                  className="note-card__toolbar__undo"
                  aria-disabled="true"
                />,
                <div
                  key={1}
                  role="button"
                  className="note-card__toolbar__redo"
                  aria-disabled="true"
                />,
                <div key={2} role="button" className="note-card__toolbar__done">
                  {strings.done}
                </div>,
                ]
              : ''}
          </div>
          {!this.state.takeNoteExpand
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
