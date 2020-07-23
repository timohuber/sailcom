import React, { Component } from 'react';

export default function BookingSuccess(props) {

    return (
        <div className='booking-success'>
            <h2>
                Vielen Dank für Ihre Reservierung
            </h2>
            <button className='btn primary' onClick={ e => props.closeModal(e) }>Fenster schliessen</button>
        </div>
    );
};
