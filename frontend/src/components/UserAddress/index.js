import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { baseUrl } from '../../store/constants';

export default function UserAddressForm(props) {
    // const { push } = useHistory;
    // const [userImageRef, userRestaurantImageRef] = useState(React.createRef());
    // const [licenceImageRef, licenceRestaurantImageRef] = useState(
    //     React.createRef()
    // );

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
    };

    // const avatar = document.getElementById('avatar').files[0];
    // const licence = document.getElementById('licence').files[0];

    // const requiredFields = document.querySelectorAll('.required');
    // let requiredFieldsOK = true;

    //     requiredFields.forEach((field) => {
    //         if (!field.value) {
    //             field.nextElementSibling.style.opacity = '1';
    //             requiredFieldsOK = false;
    //         } else {
    //             field.nextElementSibling.style.opacity = '0';
    //         }
    //     });
    //     if (!licence) {
    //         requiredFieldsOK = false;
    //         document.getElementById('licence-error').style.opacity = '1';
    //     } else {
    //         document.getElementById('licence-error').style.opacity = '0';
    //     }
    //     if (requiredFieldsOK) {
    //         const form = new FormData();

    //         for (const [key, value] of Object.entries(formState)) {
    //             form.append(key, value);
    //         }

    //         form.append('licence', licence);

    //         if (avatar) {
    //             form.append('avatar', avatar);
    //         }

    //         const config = {
    //             method: 'PATCH',
    //             headers: new Headers({}),
    //             body: form,
    //         };

    //         const loginResponse = fetch(
    //             baseUrl + 'registration/validation/',
    //             config
    //         )
    //             .then((res) => {
    //                 if (res.ok) {
    //                     push('/'); //TODO push doesn't work
    //                 }
    //                 return res.json();
    //             })
    //             .then((data) => {
    //                 return data;
    //             })
    //             .catch((res) => {
    //                 return;
    //             });
    //     }
    // };

    return (
        <>
            <h1>Adresse</h1>
            <form
                id='user-address-form'
                class='col-1'
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
                        >
                            <option value='' selected disabled hidden>
                                Bitte wählen
                            </option>
                            <option value='mister'>Herr</option>
                            <option value='miss'>Frau</option>
                        </select>
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
                        <label htmlFor='email'>Email</label>
                        <input
                            id='email'
                            name='email'
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
                        <label htmlFor='phone'>Festnetz</label>
                        <input
                            id='phone'
                            name='phone'
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
                        <label htmlFor='zip'>PLZ</label>
                        <input
                            id='zip'
                            name='zip'
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
                        <label htmlFor='country'>Land</label>
                        <select
                            id='country'
                            name='country'
                            onChange={(e) => onChangeHandler(e)}
                        >
                            <option value='' selected disabled hidden>
                                Bitte wählen
                            </option>
                            <option value='switzerland'>Schweiz</option>
                            <option value='germany'>Deutschland</option>
                            <option value='austria'>Österreich</option>
                            <option value='italy'>Italien</option>
                            <option value='liechtenstein'>Liechtenstein</option>
                            <option value='france'>Frankreich</option>
                            <option value='holland'>Niederlande</option>
                            <option value='spain'>Spanien</option>
                            <option value='uk'>Vereinigtes Königreich</option>
                            <option value='other'>Andere</option>
                        </select>
                    </div>
                </div>
                <div class='button-container'>
                    <button id='submit-register' className='btn' type='submit'>
                        Speichern
                    </button>
                </div>
            </form>
        </>
    );
}
