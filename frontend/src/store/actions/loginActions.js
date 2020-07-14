import { baseUrl, USER_LOGIN } from '../constants';

export const userLogin = (accessToken, refreshToken, currentUser) => {
    return {
        type: USER_LOGIN,
        accessToken,
        refreshToken,
        currentUser
    }
}

export const loginAction = (email, password) => (dispatch, getState) => {

    const config = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            email,
            password
        }),
    }

    const loginResponse = fetch(baseUrl + 'auth/token/', config)
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
        return
    })

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

    const loginResponse = fetch(baseUrl + 'users/me/', config)
    .then(response => {
        if (response.status == 401) {
        } 
        return response.json()
    }).then(loginData => {
        dispatch(userLogin(accessToken, refreshToken, loginData));
    })
    .catch(response => {
        return
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
