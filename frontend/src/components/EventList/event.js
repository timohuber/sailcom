import React, {useState} from "react";
import ButtonsContainer from './buttonsContainer'
import EventInformationTable from './eventInformationTable'
export default function Event(props) {
    const event = props.event
    console.log('single event', props)

    return (
            <article className='event-list-element generic-box'>
                <EventInformationTable event={event} />
                <ButtonsContainer event={event} />
            </article>
    );
};