import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {NavLink} from "react-router-dom";

import { registerAction } from '../../store/actions/registerActions';

export default function RegisterForm(props) {
    const dispatch = useDispatch();
    const { push } = useHistory();
    const [formState, setFormState] = useState({ email: '' });

    const onChangeHandler = (e) => {
        const key = e.currentTarget.name;
        setFormState({
            ...formState,
            [key]: e.currentTarget.value,
        });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(formState)
        dispatch(registerAction(formState.email));
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
                            name='email'
                            type='email'
                            placeholder='E-Mail'
                        />
                        <span className='error' data-key='email'/>
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
                    <NavLink className='btn secondary' to='/verifikation'>Ich habe bereits einen Code</NavLink>
                </div>
            </form>
        </>
    );
}
