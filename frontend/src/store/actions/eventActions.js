import { SET_EVENT_MODAL } from '../constants';

export const setEventModal = (modal, modalEvent) => {
    return {
        type: SET_EVENT_MODAL,
        modal,
        modalEvent
    }
}

export const setEventModalAction = (modal, modalEvent) => (dispatch, getState) => {
    dispatch(setEventModal(modal, modalEvent))
}