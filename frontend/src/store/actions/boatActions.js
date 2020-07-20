import { GET_ALL_BOAT_INFO } from '../constants';
import Axios from '../../axios';
import { formErrorHandler } from '../../lib/helpers/errorHandler';

export const getAllBoatInfo = (info) => {
    return {
        type: GET_ALL_BOAT_INFO,
        payload: info,
    };
};

export const getAllBoatInfoAction = () => async (dispatch) => {
    try {
        const response = await Axios.get('boat/');
        dispatch(getAllBoatInfo(response.data.results));
        return response;
    } catch (error) {
        console.log(error.response.data)
        formErrorHandler(error.response.data);
        return error.response.data;
    }
};
