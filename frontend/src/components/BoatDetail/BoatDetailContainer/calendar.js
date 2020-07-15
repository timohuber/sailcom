import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)

export default function BoatCalendar(props) {
    const bookings = props.boat.bookings
    const events = []

    bookings.forEach(booking => {
        const start_date = booking.from_date_time.split(/[T:-]/)
        const end_date = booking.until_date_time.split(/[T:-]/)

        events.push({
            'title': booking.user.fist_name,
            'start': new Date(start_date[0], parseInt(start_date[1]) - 1, start_date[2], start_date[3], start_date[4]),
            'end': new Date(end_date[0], parseInt(end_date[1]) - 1, end_date[2], end_date[3], end_date[4])
        })
    })

    return (
        <div id='boat-calendar'>
            <Calendar
                localizer={localizer}
                events={events}
                step={60}
                defaultDate={new Date()}
                defaultView='day'
            />
          </div>
    );
};
