import Axios from '../../axios';

export const getBoatData = () => async (dispatch) => {
    try {
        const response = await Axios.post(`boats/`);
        return response
    } catch (error) {
        console.log(error)
        return error
    }
};