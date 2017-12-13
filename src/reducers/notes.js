import shortid from 'shortid';

const notesAction = {
  ADD: 'ADD',
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
    case notesAction.ADD:
      return [...state, action.payload];
    default:
      return state;
  }
}

export { notesAction, notes };

export default notes;
