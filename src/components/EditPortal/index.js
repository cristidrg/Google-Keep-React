import { connect } from 'react-redux';

import { updateNote, goHome } from '../../actions/index';
import EditPortal from './EditPortal.jsx';

function mapStateToProps(state) {
  return {
    mode: state.appMode,
    noteToEdit: state.notes[state.focusedNote.id],
    caretPosition: state.focusedNote.caretPosition,
    focusedElement: state.focusedNote.focusedElement,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClose: () => dispatch(goHome()),
    onDone: noteAttribs => dispatch(updateNote(noteAttribs)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPortal);
