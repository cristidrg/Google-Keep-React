import React, { Component } from 'react';
import PropTypes from 'prop-types';

import strings from '../../strings';
import { defaultNoteState } from '../../reducers/notes';

import Textbox from '../Note/Textbox';
import pin from '../../assets/pin.svg';
import  { ContentEditable, Button } from '../ElementWrappers/';

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
  focusTextBox: PropTypes.bool,
  focusTitle: PropTypes.bool,
  focusPosition: PropTypes.number,
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
    if (this.props.focusTextBox) {
      this.noteRef.focusDivAtPosition(this.props.focusPosition);
    } else if (this.props.focusTitle) {
      this.titleRef.focusDivAtPosition(this.props.focusPosition);
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
        const updatedAttribute = {};
        updatedAttribute[attribute] = event.target.value;
        this.setState(state => Object.assign({}, state, updatedAttribute));
      },
    ];
  }

  //TODO: Make this better
  calculateHeight() {
    const lines = this.state.note.split("\n").map(text => text.length === 0 ? 1 : Math.ceil(text.length / 70));
    if (lines.length > 1) {
      lines.splice(-1, 1);
    }
    return `${(lines.reduce((acc, curr) => acc + curr, 0)) * 19 + 38 + 32 + 38}px`;
  }

  handleClickOutside(event) {
    if (this.nodeRef && !this.nodeRef.contains(event.target)) {
      this.saveNote();
    }
  }

  saveNote() {
    if (JSON.stringify(this.state) !== JSON.stringify(this.initialState)) {
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
      <Button
        key={8}
        role="button"
        className="note-card__toolbar__done"
        onInteraction={this.saveNote}
      >
        {strings.done}
      </Button>,
    ];
    return defaultButtons;
  }

  render() {
    const containerStyle = Object.assign({}, this.props.containerStyle);
    if (this.props.autoSetHeight) {
      containerStyle.height = this.calculateHeight();
    }

    return (
      <div style={this.props.rootStyle} className="note-card note-card--edit-note" ref={this.setNodeRef}>
        <div style={containerStyle} className="note-card__container">
          <ContentEditable
            className="note-card__title"
            text={this.state.title}
            onInput={this.handleTitleChange}
            placeholder={strings.title}
            ref={this.setTitleRef}
          />
          {Button({
            ariaLabel: strings.pinAria,
            ariaPressed: this.props.pinned,
            className: 'note-card__pin',
            icon: pin,
            onInteraction: this.props.pinNote,
          })}
          <ContentEditable
            className="note-card__textbox note-card__textbox--editable"
            text={this.state.note}
            onInput={this.handleTextBoxChange}
            placeholder={strings.takeANote}
            ref={this.setTextBoxRef}
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
