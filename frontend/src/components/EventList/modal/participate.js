import React from "react";
import EventInformationTable from "../eventInformationTable";
import {baseUrl} from "../../../store/constants";

export default function EventParticipationModal(props) {
    const event = props.event

    const toggleEventParticipation = (e) => {
        e.preventDefault()
        const config = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            })
        }
        const response = fetch(baseUrl + `event/register/${event.id}/`, config)
        .then(res => {
            console.log(res)
            return res.json()
        })
        .then(data => {
            return data;
        })
        .catch(response => {
            console.log('an error occurred')
            return response
        })
    }

    return (
        <div className='event-participation-modal'>
            <h1>Anmeldung</h1>
            <EventInformationTable event={event}/>
             <div className='modal-buttons-wrapper'>
                    <button className='btn secondary' onClick={ e => props.closeModal(e) }>Abbrechen</button>
                    <button className='btn primary' onClick={e => toggleEventParticipation(e)}>Anmelden</button>
            </div>
        </div>
    )
}


