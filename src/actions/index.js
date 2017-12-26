import shortid from 'shortid';

// @REDUXING -- Naming Actions
// All the actions are defined here. Each action has a prefix which defines the reducer it will most likely affect.
const actionType = {
  ADD_NOTE: 'NOTES_ADD',
  SELECT_NOTE: 'NOTES_SELECT_NOTE',
  PIN_NOTE: 'NOTES_PIN_NOTE',
  UPDATE_NOTE: 'NOTES_UPDATE_NOTE',
  SWITCH_MODE: 'APPMODE_SWITCH_MODE',
  FOCUS_NOTE: 'APPMODE_FOCUS_NOTE',
  UNFOCUS_NOTE: 'APPMODE_UNFOCUS_NOTE',
};

function addNote(noteAttribs) {
  const id = shortid();
  return {
    type: actionType.ADD_NOTE,
    payload: {
      [id]: {
        id,
        ...noteAttribs,
      },
    },
  };
}

function pinNote(id) {
  return {
    type: actionType.PIN_NOTE,
    payload: {
      id,
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

function updateNote(noteAttribs) {
  return {
    type: actionType.UPDATE_NOTE,
    payload: noteAttribs,
  };
}

function focusNote(id, coords) {
  return {
    type: actionType.FOCUS_NOTE,
    payload: {
      id,
      coords,
    },
  };
}

function unFocusNote() {
  return {
    type: actionType.UNFOCUS_NOTE,
  };
}

const actions = Object.assign({}, addNote, selectNote, pinNote, focusNote, unFocusNote, updateNote);

export { actionType, addNote, selectNote, pinNote, focusNote, unFocusNote, updateNote };
export default actions;
