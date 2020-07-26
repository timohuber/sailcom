import React, {useEffect, useState} from 'react';
import { useDispatch, connect } from 'react-redux';
import moment from 'moment'
import DatePicker from 'react-datepicker';
import EventTypes from './eventType'
import 'react-datepicker/dist/react-datepicker.css';
import {displayTimeDateFormat, displayTimeFormat} from '../../store/constants'
import { createEventAction } from '../../store/actions/eventActions';
import WhereCrewMemberForm from '../../components/WhereCrewMember';
import BookingsSelect from "./bookings";

function EventForm(props) {
    const dispatch = useDispatch();
    const today = new Date();
    const [value, setValue] = useState({});
    const [success, setSuccess] = useState(false)
    const [eventType, setEventType] = useState()

    const onChangeHandler = (e) => {
        const key = e.currentTarget.name;
        setValue({
            ...value,
            [key]: e.currentTarget.value,
        });
    };

    const onChangeDateHandler = (date, key) => {
        console.log(date)
        setValue({
            ...value,
            [key]: date,
        });
    };

        const onChangeBookingHandler = (e) => {
        const target = e.currentTarget
        const key = target.name;
        console.log()
        setValue({
            ...value,
            [key]: e.currentTarget.value,
            boat: parseInt(target.options[target.selectedIndex].dataset.boat),
            from_date_time: new Date(target.options[target.selectedIndex].dataset.from),
            until_date_time: new Date(target.options[target.selectedIndex].dataset.until)
        });
    };

    const onChangeTypeHandler = e => {
        setEventType(parseInt(e.currentTarget.value))
        setValue({
            ...value,
            event_type: e.currentTarget.value,
            bookings: null,
            boat: null,
            from_date_time: null,
            until_date_time: null
        });
    }

    const onSuccessHandler = () => {
        setSuccess(true)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        let fieldsOK = true
        console.log(value)

        if(!value.event_type) {
            document.getElementById('type-error').innerText = 'Bitte auswählen'
            return
        } else {
            document.getElementById('type-error').innerText = ''
        }
        if (!value.boat) {
            document.getElementById('select-error').innerText = 'Bitte auswählen'
            fieldsOK = false
        } else {
            document.getElementById('select-error').innerText = ''
        }

        if (!value.from_date_time || !value.until_date_time) {
            document.getElementById('datepicker-error').innerText = 'Bitte Zeitraum angeben'
            fieldsOK = false
        } else {
            document.getElementById('datepicker-error').innerText = ''
        }

        if (fieldsOK) {
            dispatch(createEventAction(value, onSuccessHandler));
        }
    };

     useEffect(() => {
        const datePickers = document.querySelectorAll('.react-datepicker__input-container input')
        datePickers.forEach( input => input.setAttribute("readOnly", true))
     })

    return (
        <div className='main-wrapper'>
            {
                success
                ? <h1>Success!!!</h1>
                :
            <form
                id='user-address-form'
                className='col-2'
                onSubmit={(e) => onSubmitHandler(e)}
            >
                <h1>Veranstaltung hinzufügen</h1>
                <div className='input-container'>
                    <EventTypes
                        onChangeTypeHandler={onChangeTypeHandler}
                        setEventType={setEventType}
                    />
                    {
                        eventType
                        ? eventType === 1
                            ? <WhereCrewMemberForm onChangeHandler={onChangeHandler} />
                            : eventType === 2
                                ? <BookingsSelect onChangeHandler={onChangeBookingHandler} />
                                : <p></p>
                            : <div className='input-wrapper'>Bitte geben Sie eine Kategorie an</div>
                    }
                    <div className='input-wrapper'>
                        <label htmlFor='title'>Event Name</label>
                        <input
                            id='title'
                            name='title'
                            onChange={(e) => onChangeHandler(e)}
                            value={value.title}
                        />
                        <span className='error' data-key='title'/>
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='price'>Preis</label>
                        <input
                            id='price'
                            name='price'
                            onChange={(e) => onChangeHandler(e)}
                            value={value.price}
                        />
                        <span className='error' data-key='price'/>
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

                                disabled={value.event_type == 2}
                                showTimeSelect
                                placeholderText='Von'
                                dateFormat={displayTimeDateFormat}
                                timeFormat={displayTimeFormat}
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
                                disabled={value.event_type == 2}
                                showTimeSelect
                                placeholderText='Bis'
                                dateFormat={displayTimeDateFormat}
                                timeFormat={displayTimeFormat}
                                id='until_date_time'
                                name='until_date_time'
                            />
                            <span id='datepicker-error' className='error' data-key='from_date_time'/>
                        </div>
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='description'>Beschreibung</label>
                        <textarea
                            id='description'
                            type='richtext'
                            rows='4'
                            cols='50'
                            name='description'
                            onChange={(e) => onChangeHandler(e)}
                            value={value.description}
                            placeholder='Beschreibung hier eintippen...'
                        />
                        <span className='error' data-key='description'/>
                    </div>

                    <div className='input-wrapper'>
                        <label htmlFor='meeting_point'>Treffpunkt</label>
                        <input
                            id='meeting_point'
                            name='meeting_point'
                            onChange={(e) => onChangeHandler(e)}
                            value={value.meeting_point}
                        />
                        <span className='error' data-key='meeting_point'/>
                    </div>

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
                        />
                        <span className='error' data-key='max_participants'/>
                    </div>
                </div>
                <span className='error' data-key='detail' id='error-detail'></span>
                <div className='button-container'>
                    <button className='btn primary' type='submit'>
                        Speichern
                    </button>
                </div>
            </form>
                   }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        whereCrew: state.events.whereCrew,
        user: state.currentUser.userData
    };
};

const connection = connect(mapStateToProps);
const ConnectedEventForm = connection(EventForm);

export default ConnectedEventForm;
