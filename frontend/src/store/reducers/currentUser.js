import { USER_LOGIN, USER_LOGOUT, VERIFICATION_CODE_REQUESTED, VERIFICATION_CONFIRMED, UPDATE_CURRENT_USER, GET_USER_BOOKINGS, DELETE_USER_BOOKING, USER_REQUESTED_MEMBERSHIP } from '../constants';


const initialState = {
    authorized: false,
    accessToken: '',
    refreshToken: '',
    registration: {
        verificationCodeRequested: false,
        verificationConfirmed: false
    },
    userData: {
        is_staff: false,
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
                // userInfo: {}
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

        case DELETE_USER_BOOKING:
            let new_array = []
            state.bookings.forEach(booking => {
                if(booking.id != action.booking_id) {
                    new_array.push(booking)
                }
            })
            return {
                ...state,
                bookings: new_array
            }

        case USER_REQUESTED_MEMBERSHIP:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    request_membership: true
                    }
                }

        case VERIFICATION_CONFIRMED:
            return {
                ...state,
                registration: {
                    ...state.registration,
                    verificationConfirmed: true
                    }
                }

        default:
            return state;
    }
}
