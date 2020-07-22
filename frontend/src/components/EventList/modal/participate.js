import React from "react";
import EventInformationTable from "../eventInformationTable";
import {connect} from "react-redux";
import Axios from "../../../axios";

function EventParticipationModal(props) {
    const event = props.event

    const toggleEventParticipation = (e) => {
        e.preventDefault()

        const sendRequest = async () => {
            try {
                const response = await Axios.post(`event/register/${event.id}/`);
                props.updateState(event.id)
            } catch (error) {
                console.log('an error occurred', error.response.data)
            }
        }
        sendRequest()
    }

    const signedUp = event.participants.includes(props.currentUser.id)

    return (
        <div className='event-participation-modal'>
            <h1>Anmeldung</h1>
            <EventInformationTable event={event}/>
             <div className='modal-buttons-wrapper'>
                    <button className='btn secondary' onClick={ e => props.closeModal(e) }>Abbrechen</button>
                    <button className={`btn ${signedUp ? 'disabled' : 'primary'}`} onClick={e => toggleEventParticipation(e)}>{signedUp ? 'Abmelden' : 'Anmelden'}</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.userData
    }
}
const connection = connect(mapStateToProps);
const ConnectedEventParticipationModal = connection(EventParticipationModal);

export default ConnectedEventParticipationModal;



/*

const config = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            })
        }
        const response = fetch(baseUrl + `event/register/${event.id}/`, config)
        .then(res => {

            return res.json()
        })
        .then(data => {
            return data;
        })
        .catch(error => {
                return response
        })

 */