import {GET_MEMBERSHIP_CATEGORIES} from '../constants'
import Axios from "../../axios";

export const getMembershipTypes = (payload) => {
    return {
        type: GET_MEMBERSHIP_CATEGORIES,
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




