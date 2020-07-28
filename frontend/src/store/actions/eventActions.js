import { SET_EVENT_MODAL, WHERE_CREW, CLOSE_EVENT_MODAL } from '../constants';
import Axios from '../../axios';
import {advancedFormErrorHandler, formErrorHandler} from '../../lib/helpers/errorHandler';

export const setEventModal = (modal, modalEvent) => {
    return {
        type: SET_EVENT_MODAL,
        modal,
        modalEvent,
    };
};

export const closeEventModal = () => {
    return {
        type: CLOSE_EVENT_MODAL
    }
}


export const whereIsCurrentUserCrewMember = (info, is_crew) => {
    return {
        type: WHERE_CREW,
        payload: info,
        is_crew
    };
};

export const setEventModalAction = (modal, modalEvent) => (
    dispatch,
    getState
) => {
    dispatch(setEventModal(modal, modalEvent));
};

export const closeEventModalAction = () => (dispatch, getState) => {
    dispatch(closeEventModal())
}

export const whereIsCurrentUserCrewMemberAction = () => async (dispatch) => {
    try {
        const response = await Axios.get('boat/wherecrew/');
        const is_crew = response.data.length > 0
        dispatch(whereIsCurrentUserCrewMember(response.data, is_crew));
        return response;
    } catch (error) {
        console.log('Error in getting information about crew member>', error);
        return error;
    }
};

export const createEventAction = (data, onSuccess) => async (dispatch) => {
    try {
        const response = await Axios.post('event/', data);
        onSuccess()
        return response;
    } catch (error) {
        console.log('Error creating a new event', error);
        if(error.response) {
            if(error.response.data) {
                if(typeof error.response.data === 'object') {
                    advancedFormErrorHandler(error.response.data)
                } else {
                    document.getElementById('error-detail').innerText = error.response.data
                }
            }
        }
        return error;
    }
};


/*
export const getEventInformation = (info) => {
    return {
        type: GET_EVENT_INFO,
        payload: info,
    };
};

export const getEventInformationAction = (event_id) => async (dispatch) => {
    try {
        const response = await Axios.get(`event/${event_id}/`);
        dispatch(getEventInformation(response.data));
        return response;
    } catch (error) {
        console.log('Error in getting event information', error);
    }
};

export const updateEventAction = (event_id, data) => async (dispatch) => {
    
    try {
        const response = await Axios.patch(`event/${event_id}/`, data);
        console.log(response)
        return response;
    } catch (error) {
        console.log('Error updating event', error);
        error.json().then((errorMessage) => {
            formErrorHandler(errorMessage);
        });
    }
};
*/