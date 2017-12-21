import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import strings from '../../strings';
import NoteButton from '../NoteButton/index.jsx';

import Pin from '../Note/Pin';
import Textbox from '../Note/Textbox';
import ContentEditable from '../ContentEditable';

const defaultProps = {};

const propTypes = {
  onDone: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

// In the future this will be a functional component
class EditNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pinned: false,
      title: '',
      note: '',
    };
    this.renderToolbarButtons = this.renderToolbarButtons.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.saveNote = this.saveNote.bind(this);

    this.setRef = this.setRef.bind(this);
    [this.setNodeRef] = this.setRef('node');
    [this.setTitleRef, this.handleTitleChange] = this.setRef('title');
    [this.setTextBoxRef, this.handleTextBoxChange] = this.setRef('note');
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate() {
    if (this.state.note !== this.noteRef.innerText) {
      this.noteRef.innerText = this.state.note;
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setRef(attribute) {
    return [
      (node) => {
        this[attribute + 'Ref'] = node;
      },
      (event) => {
        const newValue = event.target.innerText;
        if (newValue.trim().length !== 0 && newValue !== this.state[attribute]) {
          const updatedAttribute = {};
          updatedAttribute[attribute] = newValue;
          this.setState(state => Object.assign({}, state, updatedAttribute));
        }
      },
    ];
  }

  handleClickOutside(event) {
    if (this.nodeRef && !this.nodeRef.contains(event.target)) {
      this.saveNote();
    }
  }

  saveNote() {
    if (this.titleRef.innerText.trim().length !== 0 || this.noteRef.innerText.trim().length !== 0) {
      this.props.onDone(this.state);
    }

    this.setState(() => ({
      title: '',
      note: '',
    }));

    this.props.close();
  }

  renderToolbarButtons() {
    const defaultButtons = [
      <div key={0} role="button" className="note-card__toolbar__remind" />,
      <div key={1} role="button" className="note-card__toolbar__collaborator" />,
      <div key={2} role="button" className="note-card__toolbar__color" />,
      <div key={3} role="button" className="note-card__toolbar__image" />,
      <div key={4} role="button" className="note-card__toolbar__archive" />,
      <div key={5} role="button" className="note-card__toolbar__more" />,
      <div key={6} role="button" className="note-card__toolbar__undo" aria-disabled="true" />,
      <div key={7} role="button" className="note-card__toolbar__redo" aria-disabled="true" />,
      <NoteButton
        key={8}
        role="button"
        className="note-card__toolbar__done"
        onInteraction={this.saveNote}
      >
        {strings.done}
      </NoteButton>,
    ];
    return defaultButtons;
  }

  render() {
    // Future Redux Props
    const pinNote = () =>
      this.setState(prevState => ({
        pinned: !prevState.pinned,
      }));
    return (
      <div className="note-card note-card--edit-note" ref={this.setNodeRef}>
        <div className="note-card__container">
          {ContentEditable({
            className: 'note-card__title',
            data: this.state.title,
            onInput: this.handleTitleChange,
            placeholder: strings.title,
            setRef: this.setTitleRef,
          })}
          {Pin({ ariaPressed: this.state.pinned, onInteraction: pinNote })}
          <Textbox
            editable
            onInput={this.handleTextBoxChange}
            note={this.state.note}
            setRef={this.setTextBoxRef}
          />
          <div role="toolbar" className="note-card__toolbar">
            {this.renderToolbarButtons()}
          </div>
        </div>
      </div>
    );
  }
}

EditNote.propTypes = propTypes;
EditNote.defaultProps = defaultProps;

export default EditNote;
