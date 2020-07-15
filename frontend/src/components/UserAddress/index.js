import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { baseUrl, countrySelection } from '../../store/constants';
import { fetchUserData } from '../../store/actions/loginActions';
import { verificationAction } from '../../store/actions/registerActions';
import Loading from '../../components/GenericLoading';

export default function UserAddressForm(props) {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.userData) {
            setUserData(props.userData);
            setLoading(false);
        } else {
            dispatch(fetchUserData());
        }
    }, []);

    console.log(props)

    const initialState = {
        salutation: props.userData.salutation,
        first_name: props.userData.first_name,
        last_name: props.userData.last_name,
        username: props.userData.username,
        email: props.userData.email,
        mobile: props.userData.mobile,
        phone: props.userData.phone,
        date_of_birth: props.userData.date_of_birth,
        street: props.userData.street,
        street_appendix: props.userData.street_appendix,
        zip_code: props.userData.zip_code,
        city: props.userData.city,
        country: props.userData.country,
        avatar: props.userData.avatar,
        licence: props.userData.licence,
    };

    // const initialState = {
    //     salutation: 'Herr',
    //     first_name: 'Ramon',
    //     last_name: 'Köstli',
    //     username: 'ra',
    //     email: 'ramonkos@gmail.com',
    //     mobile: '076 14256237378',
    //     phone: '0041 14256237378',
    //     date_of_birth: '11.33.5555',
    //     street: 'Bahnhofstr. 1',
    //     street_appendix: null,
    //     zip_code: '9999',
    //     city: 'Winterthur',
    //     country: 'Deutschland',
    //     avatar: null,
    //     licence: null,
    // };

    const [formState, setFormState] = useState(initialState);
    let requiredFieldsOK = true;

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

        requiredFields.forEach((field) => {
            if (!field.value) {
                field.nextElementSibling.style.opacity = '1';
                requiredFieldsOK = false;
            } else {
                field.nextElementSibling.style.opacity = '0';
            }
        });

        if (requiredFieldsOK) {
            dispatch(verificationAction(formState));
        }
    };

    const formHandler = () => {
        return (
            <>
                <h1>
                    Adresse {props.userData.first_name} {props.userData.last_name}
                </h1>
                <form
                    id='user-address-form'
                    class='col-2'
                    onSubmit={(e) => onSubmitHandler(e)}
                >
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
                                        <option value='mister' selected>
                                            Herr
                                        </option>
                                        <option value='miss'>Frau</option>
                                    </>
                                ) : (
                                    <>
                                        <option value='miss' selected>
                                            Frau
                                        </option>
                                        <option value='mister' selected>
                                            Herr
                                        </option>
                                    </>
                                )}
                            </select>
                            <span className='error'>
                                Dieses Feld wird benötigt.
                            </span>
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
                                value={formState.last_name}
                            />
                            <span className='error'>
                                Dieses Feld wird benötigt.
                            </span>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='username'>Benutzername</label>
                            <input
                                id='username'
                                name='username'
                                onChange={(e) => onChangeHandler(e)}
                                className='required'
                                value={formState.user_name}
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
                                value={formState.email}
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
                            <span className='error'>
                                Dieses Feld wird benötigt.
                            </span>
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
                            <span className='error'>
                                Dieses Feld wird benötigt.
                            </span>
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
                            <span className='error'>
                                Dieses Feld wird benötigt.
                            </span>
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
                            <span className='error'>
                                Dieses Feld wird benötigt.
                            </span>
                        </div>
                    </div>
                    <div className='button-container'>
                        <button className='btn primary' type='submit'>
                            Speichern
                        </button>
                    </div>
                </form>
            </>
        );
    };
    // TODO: uncomment
    // return loading ? formHandler() : <Loading />;
    return loading ? <Loading /> : formHandler();
}
