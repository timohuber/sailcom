import { baseUrl, VERIFICATION_CODE_REQUESTED, VERIFICATION_CONFORMED, UPDATE_CURRENT_USER } from '../constants'


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
        .then(response => {
        console.log(response)
        if (response.status === 200) {
            document.getElementById('register-error').innerHTML = '<p class="form-success">Registrierung erfolgreich - bitte prüfen Sie Ihr E-Mail.</p>';
        } else {
            document.getElementById('register-error').innerHTML = '<p class="error">Registrierung fehlgeschlagen - diese E-Mailadresse ist ungültig oder wurde schon benutzt.</p>';
            throw new Error(response.statusText);
        }
    }).then(dispatch(verificationCodeRequested()))
    .catch(error => {
        return console.log(error)
        
    })

}

export const verificationProceedAction = () => (dispatch, getState) => {
    dispatch(userRegistrationProceedValidation())
}

// export const verificationAction = (email, code, password, password_repeat, username, first_name, last_name) => async (dispatch, getState) => {

export const verificationAction = (obj) => async (dispatch, getState) => {
    
    const config = {
        method: 'PATCH',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(obj),
        // body: JSON.stringify({
        //     email,
        //     code,
        //     password,
        //     password_repeat,
        //     username,
        //     first_name,
        //     last_name
        // }),
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
