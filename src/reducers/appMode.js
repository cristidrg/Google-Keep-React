import { actionType } from '../actions';

const appModes = {
  NORMAL: 'NORMAL',
  EDIT: 'EDIT',
  SELECT: 'SELECT',
};

function appMode(state = appModes.NORMAL, action) {
  switch (action.type) {
    case actionType.FOCUS_NOTE:
      return appModes.EDIT;
    case actionType.UNFOCUS_NOTE:
      return appModes.NORMAL;
    default:
      return state;
  }
}

function focusedNote(state = null, action) {
  switch (action.type) {
    case actionType.FOCUS_NOTE:
      return action.payload;
    case actionType.UNFOCUS_NOTE:
      return null;
    default:
      return state;
  }
}

const rootReducers = {
  appMode,
  focusedNote,
};

export { actionType, appModes, appMode, focusedNote };

export default rootReducers;
