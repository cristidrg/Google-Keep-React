import { combineReducers } from 'redux';

import notes from './notes';
import rootReducers from './appMode';
import { reducer } from '../routes/';

const rootReducer = combineReducers({ ...rootReducers, notes, location: reducer });

export default rootReducer;
