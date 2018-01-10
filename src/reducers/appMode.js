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
    case actionType.GO_HOME:
      return appModes.NORMAL;
    default:
      return state;
  }
}

function focusedNote(state = {}, action) {
  switch (action.type) {
    case actionType.FOCUS_NOTE:
      return action.payload;
    case actionType.GO_HOME:
      return {};
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
