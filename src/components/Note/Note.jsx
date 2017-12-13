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
    this.renderTakeANoteButtons = this.renderTakeANoteButtons.bind(this);
    this.renderToolbarButtons = this.renderToolbarButtons.bind(this);
    this.renderTextBox = this.renderTextBox.bind(this);
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

  renderTakeANoteButtons() {
    if (this.state.takeNoteExpand) {
      return [
        <div key={0} role="button" className="note-card__take-note__list" />,
        <div key={1} role="button" className="note-card__take-note__image" />,
        <div key={2} role="button" className="note-card__take-note__draw" />,
      ];
    }
    return '';
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

  renderToolbarButtons(editMode) {
    const defaultButtons = [
      <div key={0} role="button" className="note-card__toolbar__remind" />,
      <div key={1} role="button" className="note-card__toolbar__collaborator" />,
      <div key={2} role="button" className="note-card__toolbar__color" />,
      <div key={3} role="button" className="note-card__toolbar__image" />,
      <div key={4} role="button" className="note-card__toolbar__archive" />,
      <div key={5} role="button" className="note-card__toolbar__more" />,
    ];

    if (editMode) {
      defaultButtons.push([
        <div key={6} role="button" className="note-card__toolbar__undo" aria-disabled="true" />,
        <div key={7} role="button" className="note-card__toolbar__redo" aria-disabled="true" />,
        <div key={8} role="button" className="note-card__toolbar__done">
          {strings.done}
        </div>,
      ]);
    }

    return defaultButtons;
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
        {Select({ ariaPressed: this.state.selected, onInteraction: selectNote })}
        <div className="note-card__container">
          {this.renderTitle(editMode)}
          {Pin({ ariaPressed: this.state.pinned, onInteraction: pinNote })}
          {this.renderTextBox(editMode)}
          <div role="toolbar" className="note-card__toolbar">
            {this.renderToolbarButtons(editMode)}
          </div>
          {this.renderTakeANoteButtons()}
        </div>
      </div>
    );
  }
}

Note.propTypes = propTypes;
Note.defaultProps = defaultProps;

export default Note;
