import { baseUrl } from '../constants';
import { UPDATE_CURRENT_USER } from '../constants';

const userUpdate = (data) => {
    console.log('dispatch triggered updateUserAction');
    return {
        type: UPDATE_CURRENT_USER,
        userData: data,
    };
};

export const updateUserAction = (config) => async (dispatch, getState) => {
    const response = fetch(baseUrl + 'user/me/', config)
        .then((response) => response.json())
        .then((data) => {
            dispatch(userUpdate(data));
            return data;
        });
};
