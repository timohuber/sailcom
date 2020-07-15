import React from "react";
import EventInformationTable from "../eventInformationTable";

export default function EventInformationModal(props) {
    const event = props.event
    return (
        <div className='event-information-modal'>
            <h1>{event.title}</h1>
            <EventInformationTable event={event} />
            <p>Hier folgen die ausführliche Beschreibung des Events und die Teilnehmer</p>
        </div>
    )
}


