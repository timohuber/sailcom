import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default function BookingSuccess(props) {

    return (
        <div className='booking-success'>
            <h2>
                Vielen Dank für Ihre Reservierung
            </h2>
            <button className='btn primary'>Fenster schliessen</button>
        </div>
    );
};
