import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { registerAction } from '../../store/actions/registerActions';

export default function RegisterForm(props) {
    const dispatch = useDispatch();
    const { push } = useHistory();
    const [formState, setFormState] = useState({ email: '' });

    const onChangeHandler = (e) => {
        const key = e.currentTarget.dataset.key;
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
            <h1>Mitglied werden</h1>
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
                        <input
                            id='register-email'
                            onChange={(e) => onChangeHandler(e)}
                            data-key='email'
                            type='email'
                            placeholder='E-Mail'
                        />
                        <div className='error' id='register-error'></div>
                    </div>
                </div>

                <div class='button-container'>
                    <button
                        id='submit-register'
                        className='btn primary'
                        type='submit'
                    >
                        Absenden
                    </button>
                </div>
            </form>
        </>
    );
}
