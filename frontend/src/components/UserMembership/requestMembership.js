import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import GenericTextInput from '../GenericForm/textInput'
import {updateUserAction} from '../../store/actions/userActions'
import {advancedFormErrorHandler} from '../../lib/helpers/errorHandler'
import Axios from "../../axios";

export default function RequestMembershipForm(props) {
    const dispatch = useDispatch()
    const user = props.user.userData
    const [formState, setFormState] = useState({
        'first_name': user.first_name,
        'last_name': user.last_name,
        'street': user.street,
        'city': user.city,
        'zip_code': user.zip_code,
    })

    const onChangeHandler = (e) => {
        const key = e.currentTarget.name;
        setFormState({
            ...formState,
            [key]: e.currentTarget.value,
        });
        console.log(formState)
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const licenceFile = document.getElementById('licence').files[0];

        // manual error handling
        let requiredOK = true
        let errors = {}
        if (!user.licence && !licenceFile) {
            errors.licence = 'Dieses Feld ist erforderlich.'
            requiredOK = false
        }
        let form = new FormData()
        if (licenceFile) {
            form.append('licence', licenceFile)
        }
        for (const [key, value] of Object.entries(formState)) {
            if(!value) {
                errors[key] = 'Dieses Feld ist erforderlich.'
                requiredOK = false
            } else {
                form.append(key, value)
            }
        }
        if(requiredOK) {
            try {
                const response = await Axios.post('user/membershipRequest/');
                const updateResponse = await dispatch(updateUserAction(form))
                return response;
            } catch (error) {
                console.log('an error occurred', error.response.data)
            }

        } else {
            advancedFormErrorHandler(errors)
        }
    }
    return (
        <>
        <h1>Mitgliedschaft beantragen</h1>
        <form id='request-membership-form'
            className='col-2'
            onSubmit={(e) => onSubmitHandler(e)}>
            <p className='form-text-centered'>Bitte kontrollieren Sie Ihre Kontaktangaben</p>
            <div className='input-container'>
                <GenericTextInput onChangeHandler={onChangeHandler} data_key={'first_name'} label={'Vorname'} required={true} value={formState.first_name}/>
                <GenericTextInput onChangeHandler={onChangeHandler} data_key={'last_name'} label={'Nachname'} required={true} value={formState.last_name}/>
                <GenericTextInput onChangeHandler={onChangeHandler} data_key={'street'} label={'Strasse - Hausnummer'} required={true} value={formState.street}/>
                <GenericTextInput onChangeHandler={onChangeHandler} data_key={'city'} label={'Ort'} required={true} value={formState.city}/>
                <GenericTextInput onChangeHandler={onChangeHandler} data_key={'zip_code'} label={'PLZ'} required={true} value={formState.zip_code}/>
                <div className='input-wrapper'>
                    {
                    user.licence
                    ? <p>Ihren Segelschein haben Sie bereits eingereicht</p>
                    :<>
                            <label htmlFor='licence'>Kopie Segelausweis</label>
                            <label htmlFor='licence' className='btn primary'>
                                Choose a file..
                            </label>
                            <input
                                type='file'
                                id='licence'
                                name='licence'
                                style={{display: 'none'}}
                            />
                            <span id='licence-error' className='error' data-key='licence' />
                         </>}
                    </div>
            </div>
            <span className='error' data-key='non_field_errors'/>

            <div className='button-container'>
                <button id='submit-register' className='btn primary' type='submit'>
                    Absenden
                </button>
            </div>
        </form>
        </>
    );
};

