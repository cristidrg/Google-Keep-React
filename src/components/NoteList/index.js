import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { selectNote, focusNote, pinNote } from '../../actions';
import { makeNoteFilterSelector, noteFilters } from './selectors';

import NoteList from './NoteList.jsx';

/**
 * @REDUXING - RESELECT -Sharing selectors between instances.
 * 
 * Since there will be multiple instances of the noteList components, we need to give each
 * instance a private selector to not share its memoization function with others.
 */
function makeMapStateToProps() {
  const selector = makeNoteFilterSelector();
  const mapStateToProps = function (state, props) {
    return {
      notes: selector(state, props),
      focusedNoteId: state.focusedNote.id,
    };
  };

  return mapStateToProps;
}

function mapDispatchToProps(dispatch) {
  return {
    pinNote: id => () => dispatch(pinNote(id)),
    selectNote: id => () => dispatch(selectNote(id)),
    focusNote: (id, coords) => dispatch(focusNote(id, coords)),
  };
}

const ConnectNoteList = connect(makeMapStateToProps, mapDispatchToProps)(NoteList);

ConnectNoteList.propTypes = {
  filterOptions: PropTypes.object.isRequired,
};

export default ConnectNoteList;

export { ConnectNoteList, noteFilters };
