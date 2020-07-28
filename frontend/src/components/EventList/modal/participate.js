import React, {useState} from "react";
import EventInformationTable from "../eventInformationTable";
import {connect} from "react-redux";
import Axios from "../../../axios";
import ParticipationSuccess from './success'

function EventParticipationModal(props) {
    const [success, setSuccess] = useState(false)
    const event = props.event

    const toggleEventParticipation = (e) => {
        e.preventDefault()

        const sendRequest = async () => {
            try {
                const response = await Axios.post(`event/register/${event.id}/`);
                props.updateState(event.id)
                setSuccess(true)
            } catch (error) {
                console.log('an error occurred', error.response.data)
            }
        }
        sendRequest()
    }

    const signedUp = event.participants.includes(props.currentUser.id)

    return (
        <div className='event-participation-modal'>
            {
                success
                ? <ParticipationSuccess />
                : <>
                    <h1>Anmeldung</h1>
                    <EventInformationTable event={event}/>
                     <div className='modal-buttons-wrapper'>
                            <button className='btn secondary' onClick={ e => props.closeModal(e) }>Abbrechen</button>
                            <button className={`btn ${signedUp ? 'disabled' : 'primary'}`} onClick={e => toggleEventParticipation(e)}>{signedUp ? 'Abmelden' : 'Anmelden'}</button>
                    </div>
                </>
                }
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

