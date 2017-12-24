const actionType = {
  ADD: 'NOTES_ADD',
  SELECT_NOTE: 'NOTES_SELECT_NOTE',
};

const defaultNoteState = {
  title: '',
  note: '',
  selected: false,
  pinned: false,
};

const initialState = {
  abc: {
    id: 'abc',
    title: 'Demo Note',
    note: 'A simple note. This showcases a note. Cool!',
    selected: false,
  },
};

function notes(state = initialState, action) {
  switch (action.type) {
    case actionType.ADD:
      return {
        ...state,
        ...action.payload,
      };
    case actionType.SELECT_NOTE:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          selected: !state[action.payload.id].selected,
        },
      };
    default:
      return state;
  }
}

export { actionType, defaultNoteState, notes };

export default notes;
