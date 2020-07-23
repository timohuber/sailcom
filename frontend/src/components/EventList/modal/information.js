import React from 'react';
import {useDispatch} from "react-redux";
import EventInformationTable from '../eventInformationTable';
import { closeEventModalAction } from '../../../store/actions/eventActions';

export default function EventInformationModal(props) {
    const event = props.event;
    const dispatch = useDispatch()

    const closeModalHandler = (e) => {
        e.preventDefault();
        dispatch(closeEventModalAction());
    };

    return (
        <div className='event-information-modal'>
            <h1>{event.title}</h1>
            <EventInformationTable event={event} />
            <p>
                {event.description
                    ? event.description
                    : 'Noch keine Beschreibung vorhanden.'}
            </p>
            <button onClick={closeModalHandler} className='btn primary button-margin-top-bottom'>Close</button>
        </div>
    );
}
