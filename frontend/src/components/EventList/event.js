import React from "react";
import ButtonsContainer from './buttonsContainer'
import EventInformationTable from './eventInformationTable'
export default function Event(props) {
    const event = props.event
    return (
            <article className='event-list-element generic-box'>
                <EventInformationTable event={event} />
                <ButtonsContainer event={event} />
            </article>
    );
};