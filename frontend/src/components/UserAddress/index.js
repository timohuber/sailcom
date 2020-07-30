import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { countrySelection } from '../../store/constants';
import { fetchUserData } from '../../store/actions/loginActions';
import { updateUserAction } from '../../store/actions/userActions';
import Loading from '../../components/GenericLoading';

export default function UserAddressForm(props) {
    const initialState = {
        ...props.userData,
    };
    delete initialState.avatar;
    delete initialState.licence;
    delete initialState.email;
    delete initialState.bookings;
    delete initialState.instructed_for_models;

    const [loading, setLoading] = useState(true);
    const [formState, setFormState] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.userData) {
            setFormState(initialState);
            setLoading(false);
        } else {
            dispatch(fetchUserData());
        }
    }, []);

    const onChangeHandler = (e) => {
        const key = e.currentTarget.name;

        setFormState({
            ...formState,
            [key]: e.currentTarget.value,
        });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const form = new FormData();
        for (const [key, value] of Object.entries(formState)) {
            if (value) {
                form.append(key, value);
            }
        }
        dispatch(updateUserAction(form));
    };

    const formHandler = () => {
        return (
            <>
                <form
                    id='user-address-form'
                    class='col-2'
                    onSubmit={(e) => onSubmitHandler(e)}
                >
                    <h2>
                        Adresse {props.userData.first_name}{' '}
                        {props.userData.last_name}
                    </h2>
                    <div className='input-container'>
                        <div className='input-wrapper'>
                            <label htmlFor='salutation'>Anrede</label>
                            <select
                                id='salutation'
                                name='salutation'
                                className='required'
                                onChange={(e) => onChangeHandler(e)}
                                value={formState.salutation}
                            >
                                {formState.salutation === 'Herr' ? (
                                    <>
                                        <option value='Herr' selected>
                                            Herr
                                        </option>
                                        <option value='Frau'>Frau</option>
                                    </>
                                ) : (
                                    <>
                                        <option value='Frau' selected>
                                            Frau
                                        </option>
                                        <option value='Herr' selected>
                                            Herr
                                        </option>
                                    </>
                                )}
                            </select>
                            <span className='error'></span>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='first-name'>Vorname</label>
                            <input
                                id='first-name'
                                name='first_name'
                                onChange={(e) => onChangeHandler(e)}
                                className='required'
                                value={formState.first_name}
                            />
                            <span className='error'></span>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='last-name'>Nachname</label>
                            <input
                                id='last-name'
                                name='last_name'
                                onChange={(e) => onChangeHandler(e)}
                                className='required'
                                value={formState.last_name}
                            />
                            <span className='error'></span>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='email'>Email</label>
                            <input
                                id='email'
                                name='email'
                                value={props.userData.email}
                            />
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='mobile'>Handy</label>
                            <input
                                id='mobile'
                                name='mobile'
                                onChange={(e) => onChangeHandler(e)}
                                value={formState.mobile}
                            />
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='phone'>Festnetz</label>
                            <input
                                id='phone'
                                name='phone'
                                onChange={(e) => onChangeHandler(e)}
                                value={formState.phone}
                            />
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='date-of-birth'>Geburtsdatum</label>
                            <input
                                type='date'
                                id='date-of-birth'
                                name='date_of_birth'
                                onChange={(e) => onChangeHandler(e)}
                                value={formState.date_of_birth}
                            />
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='street'>Strasse - Hausnummer</label>
                            <input
                                id='street'
                                name='street'
                                onChange={(e) => onChangeHandler(e)}
                                value={formState.street}
                                className='required'
                            />
                            <span className='error'></span>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='street-appendix'>
                                Adresszusatz
                            </label>
                            <input
                                id='street-appendix'
                                name='street_appendix'
                                onChange={(e) => onChangeHandler(e)}
                                value={formState.street_appendix}
                            />
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='zip-code'>PLZ</label>
                            <input
                                id='zip-code'
                                name='zip_code'
                                onChange={(e) => onChangeHandler(e)}
                                value={formState.zip_code}
                                className='required'
                            />
                            <span className='error'></span>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='city'>Ort</label>
                            <input
                                id='city'
                                name='city'
                                onChange={(e) => onChangeHandler(e)}
                                value={formState.city}
                                className='required'
                            />
                            <span className='error'></span>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='country'>Land</label>
                            <select
                                id='country'
                                name='country'
                                onChange={(e) => onChangeHandler(e)}
                                className='required'
                            >
                                {countrySelection.map((country) => {
                                    if (formState.country === country.value) {
                                        return (
                                            <option
                                                value={country.key}
                                                selected
                                            >
                                                {country.value}
                                            </option>
                                        );
                                    }
                                    return (
                                        <option value={country.key}>
                                            {country.value}
                                        </option>
                                    );
                                })}
                            </select>
                            <span className='error'></span>
                        </div>
                    </div>
                    <span className='success' id='element-updated'></span>
                    <div className='button-container'>
                        <button className='btn primary' type='submit'>
                            Speichern
                        </button>
                    </div>
                </form>
            </>
        );
    };

    return loading ? <Loading /> : formHandler();
}
