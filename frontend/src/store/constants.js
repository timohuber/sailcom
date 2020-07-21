export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_SIGNUP = 'USER_SIGNUP';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const VERIFICATION_ERROR = 'VERIFICATION_ERROR';
export const RESET_ERRORS = 'RESET_ERRORS';

export const VERIFICATION_CODE_REQUESTED = 'VERIFICATION_CODE_REQUESTED';
export const VERIFICATION_CONFORMED = 'VERIFICATION_CONFORMED';
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
export const baseUrl = 'https://sailcom.propulsion-learn.ch/backend/api/';
export const siteUrl = 'https://sailcom.propulsion-learn.ch/';
// export const baseUrl = 'http://localhost:8000/backend/api/';

export const SET_EVENT_MODAL = 'SET_EVENT_MODAL';
export const WHERE_CREW = 'WHERE_CREW';
export const GET_EVENT_INFO = 'GET_EVENT_INFO';
export const CLOSE_EVENT_MODAL = 'CLOSE_EVENT_MODAL';

export const GET_ALL_BOAT_INFO = 'GET_ALL_BOAT_INFO';
export const ADD_BOAT = 'ADD_BOAT';
export const ADD_BOOKING_TO_BOAT = 'ADD_BOOKING_TO_BOAT';

/* time and date formats */
export const displayTimeDateFormatWithoutY = "MMMM d, HH:mm";
export const displayTimeDateFormat = "DD.MM.YYYY HH:mm";


export const countrySelection = [
    { key: 'switzerland', value: 'Schweiz' },
    { key: 'germany', value: 'Deutschland' },
    { key: 'austria', value: 'Österreich' },
    { key: 'italy', value: 'Italien' },
    { key: 'liechtenstein', value: 'Liechtenstein' },
    { key: 'france', value: 'Frankreich' },
    { key: 'holland', value: 'Niederlande' },
    { key: 'spain', value: 'Spanien' },
    { key: 'uk', value: 'Vereinigtes Königreich' },
    { key: 'other', value: 'Andere' },
];

export const authenticatedGetConfig =
    {
        method: 'GET',
        headers: new Headers({
        'Content-Type': 'application/json',
         'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        })
    }

export const authenticatedPostConfig = (requestBody) => {
    const form = new FormData();

    for (const [key, value] of Object.entries(requestBody)) {
        form.append(key, value);
    }
    return {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }),
        body: form,
    }
}

export const eventTypeDict = {
    1: 'Einweisungen',
    2: 'Mitsegeln',
    3: 'SailingLadies',
}

export const eventType = [
    { key: 1, value: 'Einweisungen' },
    { key: 2, value: 'Mitsegeln' },
    { key: 3, value: 'SailingLadies' },
];

export const lakeDict = {
    1: 'Bielersee',
    2: 'Bodensee',
    3: 'Genfersee',
    4: 'Greifensee',
    5: 'Hallwilersee',
    6: 'Lago Maggiore',
    7: 'Neuenburgersee',
    8: 'Thunersee',
    9: 'Vierwaldstättersee',
    10: 'Walensee',
    11: 'Zugersee',
    12: 'Zürich-Obersee',
    13: 'Zürichsee',
}