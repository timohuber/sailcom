import React from "react";
import {useDispatch} from "react-redux";
import {setEventModal, closeEventModalAction} from "../../../store/actions/eventActions"
import EventInformationModal from './information'
import EventParticipationModal from './participate'
import GenericModalClose from "../../GenericModal/close";

export default function EventModal(props) {
    const dispatch = useDispatch()

    const closeModalHandler = (e) => {
        e.preventDefault()
        dispatch(closeEventModalAction())
    }

    return (
        <div className='modal'>
            <div className='inner'>
                <GenericModalClose onClick={closeModalHandler}/>
                    { props.activeModal === 'information'
                        ? <EventInformationModal event={props.event} />
                        : props.activeModal === 'participate'
                        ? <EventParticipationModal event={props.event} closeModal={closeModalHandler}/>
                        : null
                    }
            </div>
        </div>
    )
}


