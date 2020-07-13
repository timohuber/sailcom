import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { loginAction } from '../../store/actions/loginActions';

export default function LoginForm(props) {
    const dispatch = useDispatch();
    const [formState, setFormState] = useState({ email: '', password: '' });

    const onChangeHandler = (e) => {
        const key = e.currentTarget.dataset.key;
        setFormState({
            ...formState,
            [key]: e.currentTarget.value,
        });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (formState.email === '' || formState.password === '') {
            document.getElementById('login-error').innerHTML =
                '<p>Please enter email address and password</p>';
        } else {
            document.getElementById('login-error').innerHTML = '';
            dispatch(loginAction(formState.email, formState.password));
        }
    };

    return (

        <form
            id='login-form'
            className='col-1'
            onSubmit={(e) => onSubmitHandler(e)}
        >
            <p>Bitte geben Sie Ihren Benutzernamen und das Passwort ein.</p>
            <div className='input-container'>
                <div className='input-wrapper'>
                    <input
                        id='login-email'
                        onChange={(e) => onChangeHandler(e)}
                        data-key='email'
                        type='email'
                        placeholder='EMAIL'
                    />
                    <input
                        id='login-password'
                        onChange={(e) => onChangeHandler(e)}
                        data-key='password'
                        type='password'
                        placeholder='PASSWORD'
                    />
                    <div className='error' id='login-error'>
                        Dieses Feld wird benötigt.
                    </div>
                </div>
            </div>
            <div className='button-container'>
                <button id='submit-login' className='btn' type='submit'>
                    Abschicken
                </button>
            </div>
        </form>
    );
}
