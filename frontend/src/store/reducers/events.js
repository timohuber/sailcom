import { SET_EVENT_MODAL, WHERE_CREW, CLOSE_EVENT_MODAL } from '../constants';

const initialState = {
    activeModal: null,
    modalEvent: null,
    whereCrew: null
};

export const events = (state = initialState, action) => {
    switch (action.type) {
        case SET_EVENT_MODAL:
            return {
                ...state,
                activeModal: action.modal,
                modalEvent: action.modalEvent,
            };

        case CLOSE_EVENT_MODAL:
            return {
                ...state,
                activeModal: null,
                modalEvent: null,
            };

        case WHERE_CREW:
            return {
                ...state,
                whereCrew: action.payload,

            };

        default:
            return state;
    }
};
