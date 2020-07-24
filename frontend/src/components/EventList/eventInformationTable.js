import React from "react";
import {eventTypeDict} from '../../store/constants'
import {dateFromBackendToDisplayString} from '../../lib/helpers/formatDates'

export default function EventInformationTable(props) {
    const event = props.event
    return (
        <div className='event-meta'>
            <div className='event-row'>
                <div className='event-cell' colSpan='2'>
                    <span className='upper-subtitle'>
                        {
                            event.event_type
                            ? event.event_type.id === 1
                                ? <>{event.event_type.title} {event.boat.title}</>
                                : <>{event.event_type.title}</>
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
                    {event.instructor
                        ? <>{event.instructor.first_name} {event.instructor.last_name}</>
                        : null
                    }
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