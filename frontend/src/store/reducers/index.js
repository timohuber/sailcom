import {combineReducers} from 'redux';
import {currentUser} from './currentUser';
import { events } from './events';
import {boatInfo} from './boatReducer';
import {events} from './events';
import {boats} from './boat';

export const reducers = combineReducers({
    currentUser,
    events,
    boatInfo,
    boats
})