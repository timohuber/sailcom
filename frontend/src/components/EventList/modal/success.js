import React from 'react';
import {useDispatch} from "react-redux";
import { ReactComponent as SuccessIcon } from '../../../assets/icons/success.svg'
import {closeEventModal} from '../../../store/actions/eventActions'

export default function ParticipationSuccess(props) {
    const dispatch = useDispatch()

    const closeModal = e => {
        e.preventDefault()
        dispatch(closeEventModal())
    }

    return (
        <>
            <h2>
                Vielen Dank
            </h2>
            <SuccessIcon />
            <div className='modal-buttons-wrapper'>
                <button className='btn primary' onClick={ e => closeModal(e) }>Fenster schliessen</button>
            </div>
        </>
    );
};
