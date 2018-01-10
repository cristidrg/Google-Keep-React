import { connect } from 'react-redux';

import { updateNote, goHome } from '../../actions/index';
import EditPortal from './EditPortal.jsx';

function mapStateToProps(state) {
  return {
    mode: state.appMode,
    noteToEdit: state.notes[state.focusedNote.id],
    noteCoords: state.focusedNote.coords,
    focusPosition: state.focusedNote.caretPosition,
    element: state.focusedNote.element,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClose: () => dispatch(goHome()),
    onDone: noteAttribs => dispatch(updateNote(noteAttribs)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPortal);
