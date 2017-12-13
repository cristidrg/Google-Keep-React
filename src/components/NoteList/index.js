import { connect } from 'react-redux';
import NoteList from './NoteList.jsx';

function mapStateToProps(state) {
  return {
    notes: state.notes,
  };
}

const ConnectNoteList = connect(mapStateToProps, undefined)(NoteList);

export default ConnectNoteList;
