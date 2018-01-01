import { createSelectorCreator, defaultEqualityCheck } from 'reselect';

const noteFilters = {
  PINNED: 'PINNED',
  UNPINNED: 'UNPINNED',
};

const filterNotes = function (notes, filterOptions) {
  switch (filterOptions.id) {
    case noteFilters.PINNED: return notes.filter(note => note.pinned);
    case noteFilters.UNPINNED: return notes.filter(note => !note.pinned);
    default: return notes;
  }
};

function JSONCompare(cachedValue, currValue) {
  return JSON.stringify(cachedValue) === JSON.stringify(currValue);
}

function memoizeOnFilterTypes(func, equalityCheck = defaultEqualityCheck) {
  let lastNotesByFilter = {};
  let lastResultByFilter = {};

  return function () { //TODO: Revisit when I will add tags to the notes
    const currentFilter = arguments[1].id;
    const currentNotes = arguments[0];
    if (lastNotesByFilter[currentFilter] === undefined) {
      lastResultByFilter[currentFilter] = func.apply(null, arguments);
    } else if (!equalityCheck(currentNotes, lastNotesByFilter[currentFilter])) {
      lastResultByFilter[currentFilter] = func.apply(null, arguments);
    }
    lastNotesByFilter[currentFilter] = currentNotes;
    return lastResultByFilter[currentFilter];
  };
}

/**
 * @REDUXING - RESELECT - Custom Selectors
 * Throughout the lifecycle of the application there will be two noteLists mounted at all the time which will
 * receive notes to display. These notes are filtered by the connect component. To avoid unnecessary re-computations
 * of filters we can use memoization for instant calculation of the previous value.
 *  
 * Since we are not using Immutable data structures we can't simply depend on the default equality method given by
 * reselect as we are comparing the notes object.
 * 
 * The second functionality this selector has is giving each seen filter a cache size of 1.
 * This allows instant recomputation between filter changes if the note values are not changed.
 * This yet again is a premature optimization, but I wanted to showcase what kind of functionality one can achieve
 * with selectors.
 * 
 * Check the note_filtering dev diary for more.
 */
const createNoteFilterSelector = createSelectorCreator(
  memoizeOnFilterTypes,
  JSONCompare,
);

function makeNoteFilterSelector() {
  return createNoteFilterSelector(
    [state => state.notes, (state, props) => props.filterOptions],
    (notes, filterOptions) => filterNotes(Object.values(notes), filterOptions),
  );
};

export { makeNoteFilterSelector, noteFilters, filterNotes };

