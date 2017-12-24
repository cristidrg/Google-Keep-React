import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DumbNote from '../Note/DumbNote.jsx';

const propTypes = {
  notes: PropTypes.object.isRequired,
};

class NoteList extends Component {
  render() {
    const mapNotes =
      this.props.notes &&
      Object.values(this.props.notes).map(note => <DumbNote key={note.id} {...note} />);
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
