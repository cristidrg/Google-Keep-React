import { connect } from 'react-redux';
import { updateNote } from '../../actions';
import Layout from './Layout.jsx';

function mapStateToProps(state) {
  return { // TODO: probably add allIds and byId to note?
    hasPinnedNotes: Object.values(state.notes).some(note => note.pinned),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateNote: noteAttributes => dispatch(updateNote(noteAttributes)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
