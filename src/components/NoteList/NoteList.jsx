import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Note from '../Note';

const propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class NoteList extends Component {
  render() {
    const mapNotes =
      this.props.notes &&
      this.props.notes.map(note => <Note key={note.id} note={note.note} title={note.title} />);
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
