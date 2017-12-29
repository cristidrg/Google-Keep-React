import { createSelectorCreator, defaultMemoize } from 'reselect';
import { leftPick, equalityOnKeys, compareArrayOfTuples } from '../../helpers/';

const compareIdPin = equalityOnKeys('id', 'pinned');

function notesIdPinStatusEquality(currNotes, cachedNotes) {
  return compareIdPin(Object.values(currNotes), Object.values(cachedNotes));
}

const createPinStatusSelector = createSelectorCreator(
  defaultMemoize,
  notesIdPinStatusEquality,
);

const unPinnedSelector = createPinStatusSelector(
  [state => state.notes, (state, props) => props.pinStatus],
  (notes, pinStatus) => Object.values(notes).filter(note => note.pinned === pinStatus),
);

const makeMapStateToPropsWithSelector = (selector, mapping) => {
  const selectorInstance = selector();
  return (state, props) => mapping(state, props, selectorInstance);
};

export { unPinnedSelector };
