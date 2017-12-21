import { connect } from 'react-redux';

import EditNote from './EditNote.jsx';
import { addNote } from '../../actions';

function mapStateToProps() {
  return {
    takeANote: true,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onDone: noteAttributes => dispatch(addNote(noteAttributes)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);
