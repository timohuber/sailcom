import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Axios from '../../axios';

import {
    formErrorHandler,
    elementUpdatedMessage,
} from '../../lib/helpers/errorHandler';
import { eventType, baseUrl } from '../../store/constants';
import Loading from '../../components/GenericLoading';
import { dateShowInTable } from '../../lib/helpers/formatDates';
import WhereCrewMemberForm from '../../components/WhereCrewMember';

export default function EventEditForm(props) {
    const today = new Date();
    const event_id = props.match.params.id;
    const [value, setValue] = useState([]);
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
            [key]: date,
        });
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

    const formHandler = () => {
        return (
            <div className='main-wrapper'>
                <form
                    id='user-address-form'
                    className='col-2'
                    onSubmit={(e) => onSubmitHandler(e)}
                >
                    <h1>Veranstaltung bearbeiten</h1>
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
                            <span className='error' data-key='title'></span>
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
                            <span className='error' data-key='price'></span>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='date_time'>Datum / Uhrzeit</label>

                            <div id='event-datepicker'>
                                <DatePicker
                                    selected={
                                        value.from_date_time
                                            ? dateShowInTable(
                                                  value.from_date_time
                                              )
                                            : null
                                    }
                                    minDate={today}
                                    onChange={(date) =>
                                        onChangeDateHandler(
                                            date,
                                            'from_date_time'
                                        )
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
                                            ? dateShowInTable(
                                                  value.until_date_time
                                              )
                                            : null
                                    }
                                    minDate={dateShowInTable(
                                        value.from_date_time
                                    )}
                                    onChange={(date) =>
                                        onChangeDateHandler(
                                            date,
                                            'until_date_time'
                                        )
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
                            <span className='error' data-key='comment'></span>
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
                            <span
                                className='error'
                                data-key='meeting_point'
                            ></span>
                        </div>

                        <WhereCrewMemberForm
                            onChangeHandler={onChangeHandler}
                            boat={value.boat}
                        />

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
                            <span
                                className='error'
                                data-key='max_participants'
                            ></span>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='event_type'>Kategorie</label>
                            <select
                                id='event_type'
                                name='event_type'
                                onChange={(e) => onChangeHandler(e)}
                                className='required'
                                value={value.event_type}
                            >
                                {eventType.map((type, i) => {
                                    return (
                                        <option key={i} value={type.key}>
                                            {type.value}
                                        </option>
                                    );
                                })}
                            </select>
                            <span
                                className='error'
                                data-key='event_type'
                            ></span>
                        </div>
                    </div>
                    <div className='button-container'>
                        <div>
                            <span id='element-updated'></span>
                            <button className='btn primary' type='submit'>
                                Speichern
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    };
    return loading ? <Loading /> : formHandler();
}

