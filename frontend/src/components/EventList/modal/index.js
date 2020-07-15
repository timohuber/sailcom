import React from "react";
import {useDispatch} from "react-redux";
import {setEventModal} from "../../../store/actions/eventActions"
import EventInformationModal from './information'
import EventParticipationModal from './participate'

export default function EventModal(props) {
    const dispatch = useDispatch()
    const closeModalHandler = (e) => {
        e.preventDefault()
        dispatch(setEventModal(null, null))
    }
    return (
        <div className='modal'>
            <button onClick={ e => closeModalHandler(e) } className='btn close'>X</button>
            { props.activeModal === 'information'
                ? <EventInformationModal event={props.event} />
                : props.activeModal === 'participate'
                ? <EventParticipationModal event={props.event} />
                : null
            }
        </div>
    )
}


