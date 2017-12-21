import { connect } from 'react-redux';
import { addNote } from '../../actions';
import TakeNote from './TakeNote.jsx';

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

export default connect(mapStateToProps, mapDispatchToProps)(TakeNote);
