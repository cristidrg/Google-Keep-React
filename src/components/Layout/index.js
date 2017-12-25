import { connect } from 'react-redux';
import { updateNote } from '../../actions';
import Layout from './Layout.jsx';

function mapDispatchToProps(dispatch) {
  return {
    updateNote: noteAttributes => dispatch(updateNote(noteAttributes)),
  };
}

export default connect(undefined, mapDispatchToProps)(Layout);
