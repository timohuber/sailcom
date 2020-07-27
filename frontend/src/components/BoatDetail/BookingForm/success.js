import React from 'react';
import { ReactComponent as SuccessIcon } from '../../../assets/icons/success.svg'

export default function BookingSuccess(props) {

    return (
        <div className='booking-success'>
            <h2>
                Vielen Dank für Ihre Reservierung
            </h2>
            <SuccessIcon />
            <div className='modal-buttons-wrapper'>
                <button className='btn primary' onClick={ e => props.closeModal(e) }>Fenster schliessen</button>
            </div>
        </div>
    );
};
