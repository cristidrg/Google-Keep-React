import { connect } from 'react-redux';
import { selectNote, focusNote } from '../../actions';
import NoteList from './NoteList.jsx';

function mapStateToProps(state) {
  return {
    notes: state.notes,
    focusedNoteId: state.focusedNote.id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectNote: id => () => dispatch(selectNote(id)),
    focusNote: (id, coords) => dispatch(focusNote(id, coords)),
  };
}

const ConnectNoteList = connect(mapStateToProps, mapDispatchToProps)(NoteList);

export default ConnectNoteList;
