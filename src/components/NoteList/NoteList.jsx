import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DumbNote from '../Note/DumbNote.jsx';

const propTypes = {
  id: PropTypes.string.isRequired,
  notes: PropTypes.object.isRequired,
  selectNote: PropTypes.func.isRequired,
  focusedNote: PropTypes.func.isRequired,
};

class NoteList extends Component {
  constructor(props) {
    super(props);
    this.domNode = null;
    this.focusNote = this.focusNote.bind(this);
    this.setContainerRef = this.setContainerRef.bind(this);
  }

  setContainerRef(node) {
    this.domNode = node;
  }

  focusNote(id, idx) {
    const boundingRect = (this.domNode.children[idx].getBoundingClientRect());
    const coords = {}; // because boundingRect does not have enumerable properties.
    coords.top = boundingRect.top;
    coords.left = boundingRect.left;
    coords.height = boundingRect.height;
    this.props.focusNote(id, coords);
  }

  render() {
    const mapNotes =
      this.props.notes &&
      Object.values(this.props.notes).map((note, idx) => (
        <DumbNote
          key={note.id}
          idx={idx}
          class={this.props.focusedNoteId === note.id ? 'hide' : ''}
          {...note}
          selectNote={this.props.selectNote(note.id)}
          onContainerClick={() => this.focusNote(note.id, idx)}
        />
      ));

    return (
      <div ref={this.setContainerRef}>
        {mapNotes}
      </div>
    );
  }
}

NoteList.propTypes = propTypes;

export default NoteList;
