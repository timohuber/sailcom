import { baseUrl } from '../constants';
import { UPDATE_CURRENT_USER } from '../constants';

const userUpdate = (data) => {
    console.log('dispatch triggered updateUserAction');
    return {
        type: UPDATE_CURRENT_USER,
        userData: data,
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
