import React, { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { eventType } from '../../store/constants';
import Loading from '../../components/GenericLoading';
import {
    whereIsCurrentUserCrewMemberAction,
    createEventAction,
} from '../../store/actions/eventActions';
import WhereCrewMemberForm from '../../components/WhereCrewMember';

function EventForm(props) {
    const dispatch = useDispatch();
    const today = new Date();
    let requiredFieldsOK = true;
    const initialState = {};

    const [value, setValue] = useState(initialState);

    // useEffect(() => {
    //     if (props.whereCrew) {
    //     } else {
    //         dispatch(whereIsCurrentUserCrewMemberAction());
    //     }
    // }, []);

    const onChangeHandler = (e) => {
        const key = e.currentTarget.name;
        setValue({
            ...value,
            [key]: e.currentTarget.value,
        });
    };

    const onChangeDateHandler = (date, key) => {
        setValue({
            ...value,
            [key]: date,
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
            dispatch(createEventAction(value));
        }
    };

    const formHandler = () => {
        return (
            <div className='main-wrapper'>
                <form
                    id='user-address-form'
                    className='col-2'
                    onSubmit={(e) => onSubmitHandler(e)}
                >
                    <h1>Veranstaltung hinzufügen</h1>
                    <div className='input-container'>
                        <div className='input-wrapper'>
                            <label htmlFor='title'>Event Name</label>
                            <input
                                id='title'
                                name='title'
                                onChange={(e) => onChangeHandler(e)}
                                className='required'
                                value={value.title}
                            />
                            <span className='error'>
                                Dieses Feld wird benötigt.
                            </span>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='price'>Preis</label>
                            <input
                                id='price'
                                name='price'
                                onChange={(e) => onChangeHandler(e)}
                                className='required'
                                value={value.price}
                            />
                            <span className='error'>
                                Dieses Feld wird benötigt.
                            </span>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='date_time'>Datum / Uhrzeit</label>

                            <div id='event-datepicker'>
                                <DatePicker
                                    selected={
                                        value.from_date_time
                                            ? value.from_date_time
                                            : null
                                    }
                                    minDate={today}
                                    onChange={(date) =>
                                        onChangeDateHandler(date, 'from_date_time')
                                    }
                                    showTimeSelect
                                    placeholderText='Von'
                                    dateFormat='MMMM d, yyyy h:mm aa'
                                    id='from_date_time'
                                    name='from_date_time'
                                />
                                <DatePicker
                                    selected={
                                        value.until_date_time
                                            ? value.until_date_time
                                            : null
                                    }
                                    minDate={value.from_date_time}
                                    onChange={(date) =>
                                        onChangeDateHandler(date, 'until_date_time')
                                    }
                                    showTimeSelect
                                    placeholderText='Bis'
                                    dateFormat='MMMM d, yyyy h:mm aa'
                                    id='until_date_time'
                                    name='until_date_time'
                                />
                                <p id='datepicker-error' className='error'></p>
                            </div>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='description'>Beschreibung</label>
                            <textarea
                                id='description'
                                type='richtext'
                                rows='4'
                                cols='50'
                                name='comment'
                                onChange={(e) => onChangeHandler(e)}
                                required='required'
                                required='required'
                                value={value.description}
                            >
                                Beschreibung hier eintippen...
                            </textarea>
                            <span className='error'>
                                Dieses Feld wird benötigt.
                            </span>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='meeting_point'>Treffpunkt</label>
                            <input
                                id='meeting_point'
                                name='meeting_point'
                                onChange={(e) => onChangeHandler(e)}
                                value={value.meeting_point}
                                className='required'
                            />
                            <span className='error'>
                                Dieses Feld wird benötigt.
                            </span>
                        </div>

                        <WhereCrewMemberForm onChangeHandler={onChangeHandler}/>

                        <div className='input-wrapper'>
                            <label htmlFor='max_participants'>
                                Anzahl Teilnehmer max.
                            </label>
                            <input
                                type='max_participants'
                                id='max_participants'
                                name='max_participants'
                                onChange={(e) => onChangeHandler(e)}
                                value={value.max_participants}
                                className='required'
                            />
                            <span className='error'>
                                Dieses Feld wird benötigt.
                            </span>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='event_type'>Kategorie</label>
                            <select
                                id='event_type'
                                name='event_type'
                                onChange={(e) => onChangeHandler(e)}
                                className='required'
                            >
                                <option value='' selected disabled hidden>
                                    Bitte wählen
                                </option>
                                {eventType.map((type, i) => {
                                    // if (props.event_type === value.type) {
                                    //     return (
                                    //         <option
                                    //             value={type.key}
                                    //             selected
                                    //         >
                                    //             {type.value}
                                    //         </option>
                                    //     );
                                    // }
                                    return (
                                        <option key={i} value={type.id}>
                                            {type.value}
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
            </div>
        );
    };

    // return props.whereCrew ? formHandler() : <Loading />;
    return formHandler();
}

const mapStateToProps = (state) => {
    return {
        whereCrew: state.events.whereCrew,
    };
};
const connection = connect(mapStateToProps);
const ConnectedEventForm = connection(EventForm);

export default ConnectedEventForm;
