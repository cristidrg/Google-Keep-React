import { combineReducers } from 'redux';
import notes from './notes';
import rootReducers from './appMode';

const rootReducer = combineReducers({ ...rootReducers, notes });

export default rootReducer;
