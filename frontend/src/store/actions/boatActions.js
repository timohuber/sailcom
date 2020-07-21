import {ADD_BOAT, ADD_BOOKING_TO_BOAT} from '../constants'

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




/*
export const addBoatAction = (boatID) => async (dispatch) => {
    try {
        const response = await Axios.get(`boat/'+ ${boatID}`);
        console.log(response)
        dispatch(addBoat(response.data))
        return response;
    } catch (error) {
        console.log('Error updating event', error);
        error.json().then((errorMessage) => {
            formErrorHandler(errorMessage);
        });
    }
};

*/