import { baseUrl, USER_LOGIN } from '../constants';
import Axios from "../../axios";
import {formErrorHandler} from "../../lib/helpers/errorHandler";

export const userLogin = (accessToken, refreshToken, currentUser) => {
    return {
        type: USER_LOGIN,
        accessToken,
        refreshToken,
        currentUser
    }
}

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
        if (error) {
            if ([400, 401].includes(error.response.status)){
                formErrorHandler(error.response.data);
            }
        }
    }
    /*
    .then(response => {
        if (response.status == 401) {
            document.getElementById('login-error').innerHTML = '<p>No active account found with the given credentials.</p>';
            document.getElementById('login-password').value = '';
        } else {
            document.getElementById('login-error').innerHTML = '';
            const loginData = response.json();
            return loginData;
        }
    }).then(loginData => {
        const accessToken = loginData.access;
        const refreshToken = loginData.refresh;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        dispatch(userLogin(accessToken, refreshToken, loginData.user));
    })
    .catch(response => {
        console.log('an error occurred')
    })
     */
}

export const fetchUserData = ()=> (dispatch, getState) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    const config = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        })
    }

    const loginResponse = fetch(baseUrl + 'user/me/', config)
    .then(response => {
        if (response.status == 401) {
        } 
        return response.json()
    }).then(loginData => {
        dispatch(userLogin(accessToken, refreshToken, loginData));
    })
    .catch(response => {
        console.log('an error occurred')
    })
}




// import Axios from '../../axios';
// import { USER_LOGIN, LOGIN_ERROR, USER_LOGOUT } from '../constants';

// export const login = (token) => {
//     console.log('login action occuring');
//     return {
//         type: USER_LOGIN,
//         payload: {
//             token,
//         },
//     };
// };

// export const loginError = (error) => {
//     return {
//         type: LOGIN_ERROR,
//         payload: error,
//     };
// };

// export const logout = () => {
//     return {
//         type: USER_LOGOUT,
//     };
// };

// export const loginAction = ({ email, password }) => async (dispatch) => {
//     try {
//         const response = await Axios.post('token/', { email, password });
//         console.log({ email, password });
//         const token = response.data.access;
//         // console.log(token);
//         console.log('response>', response);
//         if (token) {
//             dispatch(login(token));
//             localStorage.setItem('token', token);
//         }
//         return response;
//     } catch (error) {
//         console.log('Error during Login >', error);
//         dispatch(loginError('The credentials are not valid'));
//         return error;
//     }
// };
