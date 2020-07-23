import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { loginAction } from '../../store/actions/loginActions';
import { getUrlParams } from '../../lib/helpers/getUrlParams';

export default function LoginForm(props) {
    const dispatch = useDispatch();
    let history = useHistory();
    const [formState, setFormState] = useState({ email: '', password: '' });
    let url_param = getUrlParams();

    const onChangeHandler = (e) => {
        const key = e.currentTarget.dataset.key;
        setFormState({
            ...formState,
            [key]: e.currentTarget.value,
        });
    };

    const pushToUrl = () => {
        url_param ? history.push(`/${url_param}`): history.push('/');  
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        dispatch(loginAction(formState, pushToUrl));
    };

    return (
        <form
            id='login-form'
            className='col-1'
            onSubmit={(e) => onSubmitHandler(e)}
        >
            <p className='form-text-centered'>
                Bitte geben Sie Ihren Benutzernamen und das Passwort ein.
            </p>
            <div className='input-container'>
                <div className='input-wrapper'>
                    <input
                        id='login-email'
                        onChange={(e) => onChangeHandler(e)}
                        data-key='email'
                        type='email'
                        placeholder='EMAIL'
                    />
                    <span id='error-email' className='error' data-key='email' />
                </div>
                <div className='input-wrapper'>
                    <input
                        id='login-password'
                        onChange={(e) => onChangeHandler(e)}
                        data-key='password'
                        type='password'
                        placeholder='PASSWORD'
                    />
                    <span
                        className='error'
                        id='login-error'
                        data-key='password'
                    />
                    <span
                        id='login-form-error'
                        className='error'
                        data-key='detail'
                    />
                </div>
            </div>
            <div className='button-container'>
                <button id='submit-login' className='btn primary' type='submit'>
                    Abschicken
                </button>
            </div>
            <div className='button-container'>
                <Link to='/registrierung'>
                    <button className='btn secondary gap-width-margin'>
                        Neu hier? Jetzt registrieren
                    </button>
                </Link>
            </div>
        </form>
    );
}
