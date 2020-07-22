import { GET_MEMBERSHIP_CATEGORIES } from '../constants';

const initialState = {
};

export const misc = (state = initialState, action) => {
    switch (action.type) {
        case GET_MEMBERSHIP_CATEGORIES:
            return {
                ...state,
                membership_categories: action.payload,
            };

        default:
            return state;
    }
};
