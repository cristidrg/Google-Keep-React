/*
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Note.scss';

import Pin from './Pin';
import Select from './Select';
import Textbox from './Textbox';
import strings from './strings';

 *
 * As it is currently, I do not see a reason for keeping the note component
 * which is used only for display purposes (not take a note/edit a note)
 * to be stateful. In the future, after most of the functionality of a note is implemented
 * I can spend time to refactor note into this dumbnote and use it for edit and take a note components.
 *

function renderToolbarButtons() {
  return [
    <div key={0} role="button" className="note-card__toolbar__remind" />,
    <div key={1} role="button" className="note-card__toolbar__collaborator" />,
    <div key={2} role="button" className="note-card__toolbar__color" />,
    <div key={3} role="button" className="note-card__toolbar__image" />,
    <div key={4} role="button" className="note-card__toolbar__archive" />,
    <div key={5} role="button" className="note-card__toolbar__more" />,
  ];
}

function renderEditToolbarButtons() {
  return [
    <div key={0} role="button" className="note-card__toolbar__remind" />,
    <div key={1} role="button" className="note-card__toolbar__collaborator" />,
    <div key={2} role="button" className="note-card__toolbar__color" />,
    <div key={3} role="button" className="note-card__toolbar__image" />,
    <div key={4} role="button" className="note-card__toolbar__archive" />,
    <div key={5} role="button" className="note-card__toolbar__more" />,
    <div key={6} role="button" className="note-card__toolbar__undo" aria-disabled="true" />,
    <div key={7} role="button" className="note-card__toolbar__redo" aria-disabled="true" />,
    <div key={8} role="button" className="note-card__toolbar__done">
      {strings.done}
    </div>,
  ];
}

function renderTextBox(note, editable) {}

function Title(props) {
  return (
    <div contentEditable={props.editable} className="note-card__title">
      {props.title}
    </div>
  );
}

const DumbNote = (Title, TextBox, Toolbar) => props => (
  <div className="note-card">
    {Select({ ariaPressed: props.selected, onInteraction: props.selectNote })}
    <div className="note-card__container">
      {Title(props.title)}
      {Pin({ ariaPressed: props.pinned, onInteraction: props.pinNote })}
      <Textbox editable={props.editable} note={props.note} />
      <div role="toolbar" className="note-card__toolbar">
        {Toolbar()}
      </div>
    </div>
  </div>
);

const Note = DumbNote(renderTitle, renderTextBox, renderToolbarButtons);

class TakeANote extends Component {
  constructor(props) {
    super(props);
    this.setNodeRef = this.setNodeRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
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
}
// const takeANote = DumbNote(renderEditTitle, renderTextBoxEdit, renderEditToolbarButtons);

Note.propTypes = {
  title: PropTypes.string,
  note: PropTypes.string,
  selected: PropTypes.bool,
  pinned: PropTypes.bool,
};

Note.defaultProps = {
  title: '',
  note: '', // These should properly have newline characters and be already trimmed to under 400 characters
  selected: false,
  pinned: false,
};

export default Note;
*/
