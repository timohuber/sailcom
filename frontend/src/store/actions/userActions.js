import { baseUrl, UPDATE_CURRENT_USER, USER_LOGOUT } from '../constants';

const userUpdate = (data) => {
    return {
        type: UPDATE_CURRENT_USER,
        userData: data,
    };
};

const userLogout = () => {
    return {
        type: USER_LOGOUT,
    };
};


export const updateUserAction = (data) => async (dispatch, getState) => {
    const config =
    {
        method: 'PATCH',
        headers: new Headers({
        'Content-Type': 'application/json',
         'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }),
        body: JSON.stringify(
            data
        ),
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
