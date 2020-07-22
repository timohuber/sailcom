import { baseUrl, USER_LOGIN } from '../constants';
import Axios from '../../axios';
import { formErrorHandler } from '../../lib/helpers/errorHandler';

export const userLogin = (accessToken, refreshToken, currentUser) => {
    return {
        type: USER_LOGIN,
        accessToken,
        refreshToken,
        currentUser,
    };
};

export const loginAction = (formState) => async (dispatch, getState) => {
    try {
        const res = await Axios.post(`auth/token/`, formState);
        if (res.status === 200) {
            const accessToken = res.data.access;
            const refreshToken = res.data.refresh;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            dispatch(userLogin(accessToken, refreshToken, res.data.user));
        }
        return res;
    } catch (error) {
        if (error.response) {
            if ([400, 401].includes(error.response.status)) {
                formErrorHandler(error.response.data);
            }
        }
    }
};

export const fetchUserData = () => (dispatch, getState) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    const config = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        }),
    };

    const loginResponse = fetch(baseUrl + 'user/me/', config)
        .then((response) => {
            if (response.status == 401) {
            }
            return response.json();
        })
        .then((loginData) => {
            dispatch(userLogin(accessToken, refreshToken, loginData));
        })
        .catch((response) => {
            console.log('an error occurred');
        });
};
