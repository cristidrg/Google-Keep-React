import React, { Component } from 'react';
import PropTypes from 'prop-types';

import strings from '../../strings';
import NoteButton from '../NoteButton/index.jsx';
import { defaultNoteState } from '../../reducers/notes';

import Pin from '../Note/Pin';
import Textbox from '../Note/Textbox';
import ContentEditable from '../ContentEditable';

const defaultProps = {
  autoSetHeight: false,
  rootStyle: {},
  containerStyle: {},
};

const propTypes = {
  autoSetHeight: PropTypes.bool,
  noteToEdit: PropTypes.object.isRequired,
  onDone: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

/**
 * @EVENT_HANDLING
 *  The Edit Note Component has behavior when a user clicks outside of its bounds:
 *    - When it's used inside TakeNote, it switches to the one line ui.
 *    - When it's used to edit a note, it returns the person to the main screen.
 *  An easy way to implement this is to attach a mousedown listener to the document and
 *  check if the target of the event is inside our component.
 *
 *  @PERFORMANCE
 *    As this is the only time when this kind of behavior is required in the app, it is fine to do it this way, however
 *    if you find yourself needing this functionaltiy a lot of times, attaching an event listener
 *    for each component might slow down the performance of the page. A good example for when not to use
 *    this would be in the list of Notes. Creating a document level event listener for each note would be too much.
 *
 * @ES_FEATURE -- Array Destructuring
 *  This component makes use of several functions to set references on components, most of these setters have
 *  the same pattern. I made use of array destructuring to shorten my code. The setRef function returns an array
 *  with two functions that are used by the ref setters/handlers.
 *
 * @TODO In the future this will be a functional component
 */
class EditNote extends Component {
  constructor(props) {
    super(props);
    this.state = props.noteToEdit;
    this.initialState = props.noteToEdit;
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

  //TODO: IMPLEMENT THIS LATER
  calculateHeight() {
    return '140px';
  }

  handleClickOutside(event) {
    if (this.nodeRef && !this.nodeRef.contains(event.target)) {
      this.saveNote();
    }
  }

  saveNote() {
    if (JSON.stringify(this.state) !== JSON.stringify(this.initialState)
      && (this.titleRef.innerText.trim().length !== 0 || this.noteRef.innerText.trim().length !== 0)) {
      this.props.onDone(this.state);
    }

    this.setState(() => defaultNoteState); // empty fields

    this.props.onClose();
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

  
    const containerStyle = Object.assign({}, this.props.containerStyle);
    if (this.props.autoSetHeight) {
      containerStyle.height = this.calculateHeight();
    }

    return (
      <div style={this.props.rootStyle} className="note-card note-card--edit-note" ref={this.setNodeRef}>
        <div style={containerStyle} className="note-card__container">
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
