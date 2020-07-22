import {combineReducers} from 'redux';
import {currentUser} from './currentUser';
import {events} from './events';
import {boats} from './boat';
import {misc} from './misc';

export const reducers = combineReducers({
    currentUser,
    events,
    boats,
    misc
})