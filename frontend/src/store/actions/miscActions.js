import {GET_MEMBERSHIP_CATEGORIES, GET_EVENT_TYPES} from '../constants'
import Axios from "../../axios";

export const getMembershipTypes = (payload) => {
    return {
        type: GET_MEMBERSHIP_CATEGORIES,
        payload: payload,
    };
};

export const getEventTypes = (payload) => {
    return {
        type: GET_EVENT_TYPES,
        payload: payload,
    };
};

export const getMembershipTypesAction = () => async (dispatch, getState) => {
    try {
        const response = await Axios.get('membershipTypes/');
        dispatch(getMembershipTypes(response.data))
        return response;
    } catch (error) {
        if(error) {
            console.log('an error occurred', error)
        }
    }
}

export const getEventTypesAction = () => async (dispatch) => {
    try {
        const response = await Axios.get('event/type/');
        dispatch(getEventTypes(response.data['results']))
        return response;
    } catch (error) {
        if(error) {
            console.log('an error occurred', error)
        }
    }
}

