import React, {useEffect} from 'react';
import DatePicker from "react-datepicker";
import {displayTimeDateFormat, displayTimeFormat} from "../../../store/constants"
import "react-datepicker/dist/react-datepicker.css";

export default function BoatDateTimePicker(props) {
    const today = new Date()

     useEffect(() => {
        const datePickers = document.querySelectorAll('.react-datepicker__input-container input')
        datePickers.forEach( input => input.setAttribute("readOnly", true))
     })

    return (
        <div className='boat-datepicker-container'>
            <div id='boat-datepicker'>
                <DatePicker
                    selected={props.startDateTime ? props.startDateTime : null}
                    minDate={today}
                    onChange={date => props.setStartDateTime(date)}
                    showTimeSelect
                    placeholderText="Von"
                    dateFormat={displayTimeDateFormat}
                    timeFormat={displayTimeFormat}
                />
                <DatePicker
                    selected={props.endDateTime ? props.endDateTime : null}
                    minDate={props.startDateTime}
                    onChange={date => props.setEndDateTime(date)}
                    showTimeSelect
                    placeholderText="Bis"
                    dateFormat={displayTimeDateFormat}
                    timeFormat={displayTimeFormat}
                />
                <p id='datepicker-error' className='error'></p>
              </div>
        </div>
    );
};
