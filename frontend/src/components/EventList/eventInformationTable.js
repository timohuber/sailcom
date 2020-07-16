import React from "react";

export default function EventInformationTable(props) {
    const event = props.event
    return (
        <div className='event-meta'>
            <div className='event-row'>
                <div className='event-cell'>
                    Kategorie
                </div>
                <div className='event-cell'>
                    {event.event_type}
                </div>
            </div>
            <div className='event-row'>
                <div className='event-cell'>
                    Datum / Uhrzeit
                </div>
                <div className='event-cell'>
                    {event.from_date_time}
                </div>
            </div>
            <div className='event-row'>
                <div className='event-cell'>
                    Treffpunkt
                </div>
                <div className='event-cell'>
                    {event.meeting_point}
                </div>
            </div>
            <div className='event-row'>
                <div className='event-cell'>
                    Leitung
                </div>
                <div className='event-cell'>
                    {event.instructor.first_name} {event.instructor.last_name}
                </div>
            </div>
            <div className='event-row'>
                <div className='event-cell'>
                    Kosten
                </div>
                <div className='event-cell'>
                    {event.price}
                </div>
            </div>
            <div className='event-row'>
                <div className='event-cell'>
                    Plätze
                </div>
                <div className='event-cell'>
                    {event.participants.length} / 3
                </div>
            </div>
        </div>
    );
};