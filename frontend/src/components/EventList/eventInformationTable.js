import React from "react";
import {eventTypeDict} from '../../store/constants'
import {dateFromBackendToDisplayString} from '../../lib/helpers/formatDates'

export default function EventInformationTable(props) {
    const event = props.event
    console.log(event)
    return (
        <div className='event-meta'>
            <div className='event-row'>
                <div className='event-cell' colSpan='2'>
                    <span className='upper-subtitle'>
                        {
                            Boolean(event.event_type)
                            ? eventTypeDict[event.event_type]
                            : 'Nicht zugeordnet'
                        }
                    </span>
                </div>
            </div>
            <div className='event-row'>
                <div className='event-cell'>
                    Datum / Uhrzeit
                </div>
                <div className='event-cell'>
                    {dateFromBackendToDisplayString(event.from_date_time)}
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
                    CHF {event.price}
                </div>
            </div>
            <div className='event-row'>
                <div className='event-cell'>
                    Plätze
                </div>
                <div className='event-cell'>
                    {event.participants.length} / {event.max_participants}
                </div>
            </div>
        </div>
    );
};