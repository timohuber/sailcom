import { GET_ALL_BOAT_INFO, ADD_BOAT, ADD_BOOKING_TO_BOAT } from '../constants';
import Axios from '../../axios';
import { formErrorHandler } from '../../lib/helpers/errorHandler';

export const getBoatOverview = (info) => {
    return {
        type: GET_ALL_BOAT_INFO,
        payload: info,
    };
};

export const getBoatOverviewAction = () => async (dispatch) => {
    try {
        const response = await Axios.get('boat/');
        dispatch(getBoatOverview(response.data.results));
        return response;
    } catch (error) {
        if (error) {
            console.log('an error occurred', error)
        }
    }
};

export const addBoat = (boat) => {
    return {
        type: ADD_BOAT,
        payload: boat,
        id: [boat.id]
    };
};


export const addBoatAction = (boat) => async (dispatch) => {
   dispatch(addBoat(boat));
};


export const addBookingToBoat = (booking) => {
    return {
        type: ADD_BOOKING_TO_BOAT,
        payload: booking,
        booking_id: booking.id,
        boat_id: booking.boat
    };
};

export const addBookingToBoatAction = (booking) => (dispatch) => {
    console.log('addBookingToBoatAction', booking)
   dispatch(addBookingToBoat(booking));
};

