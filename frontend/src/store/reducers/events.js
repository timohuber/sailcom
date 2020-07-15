import {SET_EVENT_MODAL} from '../constants';

const initialState = {
    activeModal: null,
    modalEvent: null
};

export const events = (state = initialState, action) => {
    switch (action.type) {
        case SET_EVENT_MODAL:
            return {
                ...state,
                activeModal: action.modal,
                modalEvent: action.modalEvent
                }

        default:
            return state;
    }
}
