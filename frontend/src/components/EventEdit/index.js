import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Axios from '../../axios';
import {formErrorHandler, elementUpdatedMessage} from '../../lib/helpers/errorHandler';
import {baseUrl, displayTimeDateFormat, displayTimeFormat} from '../../store/constants';
import Loading from '../../components/GenericLoading';
import {dateShowInDatepicker, dateToISOString} from '../../lib/helpers/formatDates';
import WhereCrewMemberForm from '../../components/WhereCrewMember';
import {NavLink} from "react-router-dom";
import GenericTextInput from "../GenericForm/textInput";
import BookingsSelect from "../EventCreate/bookings";

export default function EventEditForm(props) {
    const today = new Date();
    const event_id = props.match.params.id;
    const [value, setValue] = useState([]);
    const [displayDates, setDisplayDates] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const config = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        };
        const response = fetch(baseUrl + `event/${event_id}/`)
            .then((res) => res.json())
            .then((data) => {
                setValue(data);

                setLoading(false);
            })
            .catch((response) => {
                return;
            });
    }, []);

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
            [key]: dateToISOString(date),
        });
        setDisplayDates({
            ...displayDates,
            [key]: date,
        })
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const errorSpanList = document.querySelectorAll('.error');
        errorSpanList.forEach((error) => {
            error.innerText = '';
        });
        try {
            const response = await Axios.patch(`event/${event_id}/`, value);
            elementUpdatedMessage('Event');
            return response;
        } catch (error) {
            if (error) {
                formErrorHandler(error.response.data);
            }
        }
    };

    const onChangeBookingHandler = (e) => {
        const target = e.currentTarget
        const key = target.name;
        setValue({
            ...value,
            [key]: e.currentTarget.value,
            boat: parseInt(target.options[target.selectedIndex].dataset.boat),
            from_date_time: new Date(target.options[target.selectedIndex].dataset.from),
            until_date_time: new Date(target.options[target.selectedIndex].dataset.until)
        });
    };

     useEffect(() => {
        const datePickers = document.querySelectorAll('.react-datepicker__input-container input')
        datePickers.forEach( input => input.setAttribute("readOnly", true))
     })

    const formHandler = () => {
        return (
            <div className='main-wrapper'>
                <form
                    id='edit-event-form'
                    className='col-2'
                    onSubmit={(e) => onSubmitHandler(e)}
                >
                    <h1>Veranstaltung bearbeiten</h1>
                    <div className='input-container'>
                        {
                            value.event_type
                            ? value.event_type === 1
                                ? <WhereCrewMemberForm onChangeHandler={onChangeHandler} />
                                : value.event_type === 2
                                    ? <BookingsSelect onChangeHandler={onChangeBookingHandler} />
                                    : <p></p>
                                : <div className='input-wrapper'>Bitte geben Sie eine Kategorie an</div>
                        }
                        <GenericTextInput onChangeHandler={onChangeHandler} data_key={'title'} label={'Event Name'} required={true} value={value.title}/>
                        <GenericTextInput onChangeHandler={onChangeHandler} data_key={'price'} label={'Preis'} required={true} value={value.price}/>

                        <div className='input-wrapper'>
                            <label htmlFor='date_time'>Datum / Uhrzeit</label>

                            <div id='event-datepicker'>
                                <DatePicker
                                    selected={value.from_date_time ? dateShowInDatepicker(value.from_date_time) : null }
                                    minDate={today}
                                    onChange={(date) => onChangeDateHandler(date, 'from_date_time') }
                                    disabled={value.event_type == 2}
                                    showTimeSelect
                                    placeholderText='Von'
                                    dateFormat={displayTimeDateFormat}
                                    timeFormat={displayTimeFormat}
                                    id='from_date_time'
                                    name='from_date_time'
                                />
                                <DatePicker
                                    selected={value.until_date_time ? dateShowInDatepicker(value.until_date_time) : null }
                                    minDate={value.from_date_time}
                                    onChange={(date) => onChangeDateHandler(date, 'until_date_time')}
                                    disabled={value.event_type == 2}
                                    showTimeSelect
                                    placeholderText='Bis'
                                    dateFormat={displayTimeDateFormat}
                                    timeFormat={displayTimeFormat}
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
                                value={value.description}
                                placeholder={'Beschreibung hier eintippen...'}
                            >
                            </textarea>
                            <span className='error' data-key='comment'></span>
                        </div>

                        <GenericTextInput onChangeHandler={onChangeHandler} data_key={'meeting_point'} label={'Treffpunkt'} required={true} value={value.meeting_point}/>
                        <GenericTextInput onChangeHandler={onChangeHandler} data_key={'max_participants'} label={'Anzahl Teilnehmer max.'} required={true} value={value.max_participants}/>

                    </div>
                    <div className='button-container'>
                        <div>
                            <span id='element-updated' />
                            <button className='btn primary' type='submit'>
                                Speichern
                            </button>
                        </div>
                    </div>
                    <NavLink to='/events' className='btn secondary'>Zurück</NavLink>
                </form>
            </div>
        );
    };
    return loading ? <Loading /> : formHandler();
}

