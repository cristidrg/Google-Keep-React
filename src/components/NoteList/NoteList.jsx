import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DumbNote from '../Note/DumbNote.jsx';

import './NoteList.scss';

const propTypes = {
  id: PropTypes.string.isRequired,
  heading: PropTypes.string,
  notes: PropTypes.array.isRequired,
  selectNote: PropTypes.func.isRequired,
  focusedNote: PropTypes.func.isRequired,
  pinNote: PropTypes.func.isRequired,
};

class NoteList extends Component {
  constructor(props) {
    super(props);
    this.domNode = null;
    this.setContainerRef = this.setContainerRef.bind(this);
  }

  setContainerRef(node) {
    this.domNode = node;
  }

  render() {
    if (this.props.notes.length) {
      const mapNotes =
      this.props.notes.map((note, idx) => (
        <DumbNote
          key={note.id}
          idx={idx}
          class={this.props.focusedNoteId === note.id ? 'hide' : ''}
          {...note}
          selectNote={this.props.selectNote(note.id)}
          pinNote={this.props.pinNote(note.id)}
          onContainerClick={focusedElement => () => { this.props.focusNote(note.id, window.getSelection().focusOffset, focusedElement); }}
        />
      ));

      return (
        <div className="note-list">
          {this.props.heading ? <p className="note-list__heading" >{this.props.heading}</p> : null }
          <div className="note-list__container" ref={this.setContainerRef}>
            {mapNotes}
          </div>
        </div>
      );
    } else {
      return (null);
    }
  }
}

NoteList.propTypes = propTypes;

export default NoteList;
