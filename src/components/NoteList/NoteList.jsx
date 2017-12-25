import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DumbNote from '../Note/DumbNote.jsx';

const propTypes = {
  notes: PropTypes.object.isRequired,
  selectNote: PropTypes.func.isRequired,
  focusNote: PropTypes.func.isRequired,
};

class NoteList extends Component {
  render() {
    const mapNotes =
      this.props.notes &&
      Object.values(this.props.notes).map(note =>(
        <DumbNote
          key={note.id}
          {...note}
          selectNote={this.props.selectNote(note.id)}
          focusNote={this.props.focusNote(note.id)}
        />
      ));
    return (
      <div>
        {mapNotes}
        <br />
        <br />
      </div>
    );
  }
}

NoteList.propTypes = propTypes;

export default NoteList;
