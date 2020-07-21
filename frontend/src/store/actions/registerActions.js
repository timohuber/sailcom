import { baseUrl, VERIFICATION_CODE_REQUESTED, VERIFICATION_CONFORMED, UPDATE_CURRENT_USER } from '../constants'
import {formErrorHandler} from '../../lib/helpers/errorHandler'

export const userVerification = () => {
    return {
        type: UPDATE_CURRENT_USER,
    }
}

export const verificationCodeRequested = () => {
    return {
        type: VERIFICATION_CODE_REQUESTED,
    }
}
export const userRegistrationProceedValidation = () => {
    return {
        type: VERIFICATION_CONFORMED,
    }
}

export const registerAction = (email) => (dispatch, getState) => {

    const config = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            email
        }),
    }

    const registrationResponse = fetch(baseUrl + 'registration/', config)
    .then(res => {
        console.log(res)
        if (!res.ok) {
            throw res
        } else {
            dispatch(verificationCodeRequested())
            return res.json()
        }
    })
    .then(data => {
        return data
    })
    .catch(error => {
        console.log('error', error)

        /*
        error.json().then( errorMessage => {
            formErrorHandler(errorMessage)
        });
         */
    })
}

export const verificationProceedAction = () => (dispatch, getState) => {
    dispatch(userRegistrationProceedValidation())
}

export const verificationAction = (obj) => async (dispatch, getState) => {
    
    const config = {
        method: 'PATCH',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(obj),

    }
    let fetchOk = false;
    const response = await fetch(baseUrl + 'registration/validation/', config)
    try{
        if (response.status === 400) {
            document.getElementById('verification-error').innerHTML = '<p class="error">Code ungültig.</p>';
            document.getElementById('verification-error').style.opacity = '1';
            document.getElementById('verification-code').value = '';
            fetchOk = false;
            throw new Error('codes do not match');
        } else if (response.status == 500) {
            document.getElementById('verification-error').innerHTML = '<p class="error">Der Benutzer wurde warscheinlich bereits registriert. Registrierung fehlgeschlagen.</p>';
            document.getElementById('verification-error').style.opacity = '1';
            fetchOk = false;
            throw new Error('Der Benutzer wurde warscheinlich bereits registriert. Registrierung fehlgeschlagen.');
         } else {
            document.getElementById('verification-error').innerHTML = '';
            fetchOk = true;
        }
    }

    

    catch(err){
        console.log('error', err)
        fetchOk = false;
    }

    if(fetchOk) {
        return true;
    } else {
        return false;
    }

}
