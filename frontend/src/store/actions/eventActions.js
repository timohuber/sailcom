import { SET_EVENT_MODAL, WHERE_CREW } from '../constants';
import Axios from '../../axios';

export const setEventModal = (modal, modalEvent) => {
    return {
        type: SET_EVENT_MODAL,
        modal,
        modalEvent
    }
}

export const whereIsCurrentUserCrewMember = (info) => {
    return {
        type: WHERE_CREW,
        payload: info,
    }
};

export const setEventModalAction = (modal, modalEvent) => (dispatch, getState) => {
    dispatch(setEventModal(modal, modalEvent))
}

export const whereIsCurrentUserCrewMemberAction = () => async (dispatch) => {
    try {
        const response = await Axios.get('boat/wherecrew/');
        dispatch(whereIsCurrentUserCrewMember(response.data['results']));
        return response
    } catch (error) {
        console.log('Error in getting information about crew member>', error);
        return error
    }
};

export const createEventAction = (data) => async (dispatch) => {
    try {
        const response = await Axios.post('event/', data);
        return response
    } catch (error) {
        console.log('Error creating a new event', error)
        return error
    }
};

