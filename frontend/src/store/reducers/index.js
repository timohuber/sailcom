import {combineReducers} from 'redux';
import {currentUser} from './currentUser';
import {events} from './events';

export const reducers = combineReducers({
    currentUser,
    events
})