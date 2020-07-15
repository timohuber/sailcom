import React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// shouldCloseOnSelect={false}

export default function BoatDateTimePicker(props) {
    const today = new Date()
    return (
        <div id='boat-datepicker'>
            <DatePicker
                selected={props.startDateTime ? props.startDateTime : null}
                minDate={today}
                onChange={date => props.setStartDateTime(date)}
                showTimeSelect
                placeholderText="Bitte wählen"
                dateFormat="MMMM d, yyyy h:mm aa"

            />
            <DatePicker
                selected={props.endDateTime ? props.endDateTime : null}
                minDate={props.startDateTime}
                onChange={date => props.setEndDateTime(date)}
                showTimeSelect
                placeholderText="Bitte wählen"
                dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
    );
};
