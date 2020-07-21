import {combineReducers} from 'redux';
import {currentUser} from './currentUser';
<<<<<<< HEAD
import { events } from './events';
import {boatInfo} from './boatReducer';
||||||| 804000f
import {events} from './events';
=======
import {events} from './events';
import {boats} from './boat';

>>>>>>> master

export const reducers = combineReducers({
    currentUser,
<<<<<<< HEAD
    events,
    boatInfo,
||||||| 804000f
    events
=======
    events,
    boats
>>>>>>> master
})