import React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function BoatDateTimePicker(props) {
    const today = new Date()

    console.log(props.startDateTime)
    return (
        <div className='boat-datepicker-container'>
            <div id='boat-datepicker'>
                <DatePicker
                    selected={props.startDateTime ? props.startDateTime : null}
                    minDate={today}
                    onChange={date => props.setStartDateTime(date)}
                    showTimeSelect
                    placeholderText="Von"
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
                <DatePicker
                    selected={props.endDateTime ? props.endDateTime : null}
                    minDate={props.startDateTime}
                    onChange={date => props.setEndDateTime(date)}
                    showTimeSelect
                    placeholderText="Bis"
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
                <p id='datepicker-error' className='error'></p>
              </div>
        </div>
    );
};
