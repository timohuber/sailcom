import { baseUrl, UPDATE_CURRENT_USER, USER_LOGOUT, GET_USER_BOOKINGS, DELETE_USER_BOOKING, USER_REQUESTED_MEMBERSHIP } from '../constants';
import Axios from "../../axios";

const userUpdate = (data) => {
    return {
        type: UPDATE_CURRENT_USER,
        payload: data,
    };
};

const userLogout = () => {
    return {
        type: USER_LOGOUT,
    };
};

const getUserBookings = (data) => {

    return {
        type: GET_USER_BOOKINGS,
        payload: data
    };
};

const deleteUserBooking = (booking_id) => {
    return {
        type: DELETE_USER_BOOKING,
        booking_id
    };
};

const userRequestedMembership = () => {
    return {
        type: USER_REQUESTED_MEMBERSHIP,
    };
};

export const updateUserAction = (data) => async (dispatch, getState) => {
    const config =
    {
        method: 'PATCH',
        headers: new Headers({
         'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }),
        body: data
    }
    const response = fetch(baseUrl + 'user/me/', config)
        .then(res => {
            console.log(res)
            return res.json()
        })
        .then((data) => {
            dispatch(userUpdate(data));
            return data;
        });
};

export const userLogoutAction = () => (dispatch, getState) => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    dispatch(userLogout())
};


export const getUserBookingsAction = () => async (dispatch) => {
    try {
        const response = await Axios.get('booking/myBookings/');
        dispatch(getUserBookings(response.data.results));
    } catch (error) {
        if (error) {
            console.log('an error occurred', error)
        }
    }
};

export const deleteUserBookingsAction = (booking_id) => async (dispatch) => {
    try {
        const response = await Axios.delete(`booking/${booking_id}/`);
        console.log(response)
        dispatch(deleteUserBooking(booking_id))
    } catch (error) {
        if (error) {
            console.log('an error occurred', error)
        }
    }
};

export const userRequestedMembershipAction = () => (dispatch) => {
    dispatch(userRequestedMembership())
};