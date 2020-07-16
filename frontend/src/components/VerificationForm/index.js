import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { baseUrl } from '../../store/constants';

export default function VerificationForm(props) {
    const { push } = useHistory;
    const [userImageRef, userRestaurantImageRef] = useState(React.createRef());
    const [licenceImageRef, licenceRestaurantImageRef] = useState(
        React.createRef()
    );

    const initialState = {};

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
        const avatar = document.getElementById('avatar').files[0];
        const licence = document.getElementById('licence').files[0];

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
        if (!licence) {
            requiredFieldsOK = false;
            document.getElementById('licence-error').style.opacity = '1';
        } else {
            document.getElementById('licence-error').style.opacity = '0';
        }
        if (requiredFieldsOK) {
            const form = new FormData();

            for (const [key, value] of Object.entries(formState)) {
                form.append(key, value);
            }

            form.append('licence', licence);

            if (avatar) {
                form.append('avatar', avatar);
            }

            const config = {
                method: 'PATCH',
                headers: new Headers({}),
                body: form,
            };

            const loginResponse = fetch(
                baseUrl + 'registration/validation/',
                config
            )
                .then((res) => {
                    if (res.ok) {
                        push('/'); //TODO push doesn't work
                    }
                    return res.json();
                })
                .then((data) => {
                    return data;
                })
                .catch((res) => {
                    return;
                });
        }
    };

    return (
        <>
            <h1>Registrierung abschliessen</h1>
            <form
                id='register-form'
                class='col-2'
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
                        <label htmlFor='zip-code'>PLZ</label>
                        <input
                            id='zip-code'
                            name='zip_code'
                            onChange={(e) => onChangeHandler(e)}
                        />
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='phone'>Festnetz</label>
                        <input
                            id='phone'
                            name='phone'
                            onChange={(e) => onChangeHandler(e)}
                        />
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='mobile'>Handy</label>
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
                        <label htmlFor='username'>Benutzername</label>
                        <input
                            id='username'
                            name='username'
                            onChange={(e) => onChangeHandler(e)}
                            className='required'
                        />
                        <span className='error'>
                            Dieses Feld wird benötigt.
                        </span>
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='avatar'>Benutzerphoto</label>
                        <label htmlFor='avatar' className='btn primary'>
                            Choose a file..
                        </label>
                        <input
                            type='file'
                            id='avatar'
                            name='avatar'
                            ref={userImageRef}
                            style={{ display: 'none' }}
                        />
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='licence'>Kopie Segelausweis</label>
                        <label htmlFor='licence' className='btn primary'>
                            Choose a file..
                        </label>
                        <input
                            type='file'
                            id='licence'
                            name='licence'
                            ref={licenceImageRef}
                            style={{ display: 'none' }}
                        />
                        <span id='licence-error' className='error'>
                            Dieses Bild wird benötigt.
                        </span>
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
                    <button id='submit-register' className='btn primary' type='submit'>
                        Absenden
                    </button>
                </div>
            </form>
        </>
    );
}
