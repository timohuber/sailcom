import { baseUrl, UPDATE_CURRENT_USER, USER_LOGOUT, GET_USER_BOOKINGS } from '../constants';
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
    console.log('in getUserBookings')

    return {
        type: GET_USER_BOOKINGS,
        payload: data
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
    console.log('in getUserBookingsAction')
    try {
        const response = await Axios.get('booking/myBookings/');
        dispatch(getUserBookings(response.data.results));
    } catch (error) {
        if (error) {
            console.log('an error occurred', error)
        }
    }
};
