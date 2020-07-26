import { GET_MEMBERSHIP_CATEGORIES, GET_EVENT_TYPES } from '../constants';

const initialState = {
};

export const misc = (state = initialState, action) => {
    switch (action.type) {
        case GET_MEMBERSHIP_CATEGORIES:
            return {
                ...state,
                membership_categories: action.payload,
            };

        case GET_EVENT_TYPES:
            return {
                ...state,
                event_types: action.payload,
            };

        default:
            return state;
    }
};
