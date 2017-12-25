import { actionType } from '../actions/';

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

/**
 * @REDUX -- State Design
 * Whenever I have a list of data which is used often accross the app and affects other state members I like to structure it as above,
 * using the ids of each item as a key and also giving the id to the values. Since arrays and objects in javascript are the same thing,
 * using this approach gives O(1) access to invidual items, and other cool fuctionalities by computing various maps using ids and row values
 * as described here: https://hackernoon.com/shape-your-redux-store-like-your-database-98faa4754fd5
 */
function notes(state = initialState, action) {
  switch (action.type) {
    case actionType.ADD_NOTE:
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
    case actionType.PIN_NOTE:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          pinned: !state[action.payload.id].pinned,
        },
      };
    case actionType.UPDATE_NOTE:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload,
        },
      };
    default:
      return state;
  }
}

export { actionType, defaultNoteState, notes };

export default notes;
