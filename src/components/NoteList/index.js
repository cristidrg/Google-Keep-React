import { connect } from 'react-redux';
import { selectNote, focusNote } from '../../actions';
import NoteList from './NoteList.jsx';

function mapStateToProps(state) {
  return {
    notes: state.notes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectNote: id => () => dispatch(selectNote(id)),
    focusNote: id => () => dispatch(focusNote(id)),
  };
}

const ConnectNoteList = connect(mapStateToProps, mapDispatchToProps)(NoteList);

export default ConnectNoteList;
