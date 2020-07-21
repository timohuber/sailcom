import { GET_ALL_BOAT_INFO } from '../constants';

const initialState = {
    boatInfo: null,
};

export const boatInfo = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BOAT_INFO:
            return {
                ...state,
                boatInfo: action.payload,
            };

        default:
            return state;
    }
};
