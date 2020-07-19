import { SET_EVENT_MODAL, WHERE_CREW, GET_EVENT_INFO } from '../constants';

const initialState = {
    activeModal: null,
    modalEvent: null,
    whereCrew: null,
    eventInfo: null,
};

export const events = (state = initialState, action) => {
    switch (action.type) {
        case SET_EVENT_MODAL:
            return {
                ...state,
                activeModal: action.modal,
                modalEvent: action.modalEvent,
            };
        case WHERE_CREW:
            return {
                ...state,
                whereCrew: action.payload,
            };
        case GET_EVENT_INFO:
            return {
                ...state,
                eventInfo: action.payload,
            };

        default:
            return state;
    }
};
