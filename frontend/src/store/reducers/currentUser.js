import { USER_LOGIN, USER_LOGOUT, VERIFICATION_CODE_REQUESTED, VERIFICATION_CONFORMED, UPDATE_CURRENT_USER, GET_USER_BOOKINGS } from '../constants';

const initialState = {
    authorized: false,
    accessToken: '',
    refreshToken: '',
    registration: {
        verificationCodeRequested: false
    }
};

export const currentUser = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                authorized: true,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
                userData: action.currentUser
                }

        case USER_LOGOUT:
            return {
                ...state,
                authorized: false,
                accessToken: '',
                refreshToken: '',
                userInfo: {}
                }

        case VERIFICATION_CODE_REQUESTED:
            return {
                ...state,
                registration: {
                    ...state.registration,
                    verificationCodeRequested: true,
                    email: action.email
                    }
                }

        case UPDATE_CURRENT_USER:
            return {
                ...state,
                userData: action.payload
            }

        case GET_USER_BOOKINGS:
            return {
                ...state,
                bookings: action.payload
            }

        case VERIFICATION_CONFORMED:
            return {
                ...state,
                registration: {
                    ...state.registration,
                    verificationConformed: true
                    }
                }

        default:
            return state;
    }
}
