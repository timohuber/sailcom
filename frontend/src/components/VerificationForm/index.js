import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { registerAction } from '../../store/actions/registerActions';
import { verificationAction } from '../../store/actions/registerActions';

export default function VerificationForm(props) {
    const dispatch = useDispatch();

    const initialState = {
        // first_name: null,
        // last_name: null,
        // gender: null,
        // email: null,
        // phone: null,
        // street: null,
        // city: null,
        // postal_code: null,
    };

    const [formState, setFormState] = useState(initialState);

    const onChangeHandler = (e) => {
        const key = e.currentTarget.name;
        setFormState({
            ...formState,
            [key]: e.currentTarget.value,
        });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const requiredFields = document.querySelectorAll('.required');
        let requiredFieldsOK = true;

        requiredFields.forEach((field) => {
            if (!field.value) {
                field.nextElementSibling.style.opacity = '1';
                requiredFieldsOK = false;
            } else {
                field.nextElementSibling.style.opacity = '0';
            }
        });

        return requiredFieldsOK ? verificationAction({ ...formState }) : null;
    };

    return (
        <>
            <h1>Registrierung abschliessen</h1>
            <form
                id='register-form'
                class='col-1'
                onSubmit={(e) => onSubmitHandler(e)}
            >
                <p>
                    Du möchtest gerne segeln und besitzt kein Boot. Werde
                    Mitglied und nutze 60 Boote! Das geht ganz einfach -
                    Formular ausfüllen und Du erhältst weitere Infos per Mail!
                </p>
                <div className='input-container'>
                    <div className='input-wrapper'>
                        <label htmlFor='code'>Code</label>
                        <input
                            id='code'
                            name='code'
                            onChange={(e) => onChangeHandler(e)}
                            className='required'
                        />
                        <span className='error'>
                            Dieses Feld wird benötigt.
                        </span>
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='email'>Email</label>
                        <input
                            id='email'
                            name='email'
                            onChange={(e) => onChangeHandler(e)}
                        />
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='first-name'>Vorname</label>
                        <input
                            id='first-name'
                            name='first_name'
                            onChange={(e) => onChangeHandler(e)}
                            className='required'
                        />
                        <span className='error'>
                            Dieses Feld wird benötigt.
                        </span>
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='last-name'>Nachname</label>
                        <input
                            id='last-name'
                            name='last_name'
                            onChange={(e) => onChangeHandler(e)}
                            className='required'
                        />
                        <span className='error'>
                            Dieses Feld wird benötigt.
                        </span>
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='street'>Strasse - Hausnummer</label>
                        <input
                            id='street'
                            name='street'
                            onChange={(e) => onChangeHandler(e)}
                        />
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='street-appendix'>Adresszusatz</label>
                        <input
                            id='street-appendix'
                            name='street_appendix'
                            onChange={(e) => onChangeHandler(e)}
                        />
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='city'>Ort</label>
                        <input
                            id='city'
                            name='city'
                            onChange={(e) => onChangeHandler(e)}
                        />
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='zip'>PLZ</label>
                        <input
                            id='zip'
                            name='zip'
                            onChange={(e) => onChangeHandler(e)}
                        />
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='phone'>Telephone</label>
                        <input
                            id='phone'
                            name='phone'
                            onChange={(e) => onChangeHandler(e)}
                        />
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='mobile'>Mobile</label>
                        <input
                            id='mobile'
                            name='mobile'
                            onChange={(e) => onChangeHandler(e)}
                        />
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='date-of-birth'>Geburtsdatum</label>
                        <input
                            id='date-of-birth'
                            name='date_of_birth'
                            onChange={(e) => onChangeHandler(e)}
                        />
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='user-name'>Benutzername</label>
                        <input
                            id='user-name'
                            name='user_name'
                            onChange={(e) => onChangeHandler(e)}
                            className='required'
                        />
                        <span className='error'>
                            Dieses Feld wird benötigt.
                        </span>
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='avatar'>Benutzerphoto</label>
                        <input
                            type='file'
                            id='avatar'
                            name='avatar'
                            onChange={(e) => onChangeHandler(e)}
                        />
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='avatar'>Kopie Segelausweis</label>
                        <input
                            type='file'
                            id='licence'
                            name='licence'
                            onChange={(e) => onChangeHandler(e)}
                        />
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='password'>Passwort</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            onChange={(e) => onChangeHandler(e)}
                            className='required'
                        />
                        <span className='error'>
                            Dieses Feld wird benötigt.
                        </span>
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='password-repeat'>
                            Passwort bestätigen
                        </label>
                        <input
                            type='password'
                            id='password-repeat'
                            name='password_repeat'
                            onChange={(e) => onChangeHandler(e)}
                            className='required'
                        />
                        <span className='error'>
                            Dieses Feld wird benötigt.
                        </span>
                    </div>
                </div>

                <div class='button-container'>
                    <button id='submit-register' className='btn' type='submit'>
                        Absenden
                    </button>
                </div>
            </form>
        </>
    );
}
