import React from "react";
import {dateFromBackendToDisplayString} from '../../lib/helpers/formatDates'
import {NavLink} from "react-router-dom";

export default function EventInformationTable(props) {
    const event = props.event
    return (
        <div className='event-meta'>
            <div className='event-row'>
                <div className='event-cell' colSpan='2'>
                    <NavLink to={`/boot/${event.boat.id}`} className='upper-subtitle'>
                        {
                            event.event_type
                            ? <>{event.event_type.title} {event.boat.title}</>
                            : <>Nicht zugeordner</>
                        }
                    </NavLink>
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