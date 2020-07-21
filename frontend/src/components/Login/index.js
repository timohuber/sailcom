import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { loginAction } from '../../store/actions/loginActions';
import Axios from "../../axios";
import {elementUpdatedMessage, formErrorHandler} from "../../lib/helpers/errorHandler";

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

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        dispatch(loginAction(formState))
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
                    <span className='error' data-key='email' />
                </div>
                <div className='input-wrapper'>
                    <input
                        id='login-password'
                        onChange={(e) => onChangeHandler(e)}
                        data-key='password'
                        type='password'
                        placeholder='PASSWORD'
                    />
                    <span className='error' id='login-error' data-key='password' />
                </div>
            </div>
            <span className='error' data-key='detail'/>
            <div className='button-container'>
                <button
                    id='submit-login'
                    className='btn primary'
                    type='submit'
                >
                    Abschicken
                </button>
            </div>
        </form>
    );
}

/*
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
*/