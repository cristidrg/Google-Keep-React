import { connect } from 'react-redux';

import { updateNote, unFocusNote } from '../../actions/index';
import EditPortal from './EditPortal.jsx';

function mapStateToProps(state) {
  return {
    mode: state.appMode,
    noteToEdit: state.notes[state.focusedNote],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClose: () => dispatch(unFocusNote()),
    onDone: noteAttribs => dispatch(updateNote(noteAttribs)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPortal);
