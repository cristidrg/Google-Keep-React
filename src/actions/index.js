import shortid from 'shortid';

import { actionType } from '../reducers/notes';

function addNote(noteAttribs) {
  const id = shortid();
  return {
    type: actionType.ADD,
    payload: {
      [id]: {
        id,
        ...noteAttribs,
      },
    },
  };
}

function selectNote(id) {
  return {
    type: actionType.SELECT_NOTE,
    payload: {
      id,
    },
  };
}

const actions = Object.assign({}, addNote, selectNote);

export { addNote, selectNote };
export default actions;
