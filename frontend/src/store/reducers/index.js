import {combineReducers} from 'redux';
import {currentUser} from './currentUser';
import { events } from './events';
import {boatInfo} from './boatReducer';

export const reducers = combineReducers({
    currentUser,
    events,
    boatInfo,
})