import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { registerAction } from '../../store/actions/registerActions';

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
        console.log(formState);
        const key = e.currentTarget.name;
        setFormState({
            ...formState,
            [key]: e.currentTarget.value,
        });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (formState.email === '') {
            document.getElementById('register-error').innerHTML =
                '<p>Please enter email address</p>';
        } else {
            document.getElementById('register-error').innerHTML = '';
            dispatch(registerAction(formState.email));
        }
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
                        <label htmlFor='first-name'>Vorname</label>
                        <input
                            id='first-name'
                            name='first_name'
                            onChange={(e) => onChangeHandler(e)}
                        />
                        <span className='error'>
                            Dieses Feld wird benötigt.
                        </span>
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='last-name'>Vorname</label>
                        <input id='last-name' name='last_name' onChange={(e) => onChangeHandler(e)}/>

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
                        <span className='error'>
                            Dieses Feld wird benötigt.
                        </span>
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='user-name'>Benutzername</label>
                        <input
                            id='user-name'
                            name='user_name'
                            onChange={(e) => onChangeHandler(e)}
                        />
                        <span className='error'>
                            Dieses Feld wird benötigt.
                        </span>
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='user-name'>Code</label>
                        <input
                            id='code'
                            name='code'
                            onChange={(e) => onChangeHandler(e)}
                        />
                        <span className='error'>
                            Dieses Feld wird benötigt.
                        </span>
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='password'>Passwort</label>
                        <input
                            id='password'
                            name='password'
                            onChange={(e) => onChangeHandler(e)}
                        />
                        <span className='error'>
                            Dieses Feld wird benötigt.
                        </span>
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='password-repeat'>Passwort bestätigen</label>
                        <input
                            id='password-repeat'
                            name='password_repeat'
                            onChange={(e) => onChangeHandler(e)}
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
