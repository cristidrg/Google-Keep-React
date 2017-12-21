import shortid from 'shortid';

const actionType = {
  ADD: 'NOTES_ADD',
};

const initialState = [
  {
    id: shortid(),
    title: 'Demo Note',
    note: 'A simple note. This showcases a note. Cool!',
  },
];

function notes(state = initialState, action) {
  switch (action.type) {
    case actionType.ADD:
      return [...state, action.payload];
    default:
      return state;
  }
}

export { actionType, notes };

export default notes;
