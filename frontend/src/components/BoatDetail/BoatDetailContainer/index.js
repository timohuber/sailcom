import React from 'react';
import {NotQualifiedButton} from './buttons'
import {PricesTable} from './prices'

export default function BoatDetailContainer(props) {
    const boat = props.boat
    console.log(boat)
    return (
        <div className='main-wrapper boat-detail-container'>
            <h1>{boat.title}</h1>
            <p className='subtitle'>{boat.mooring.lake.title}, {boat.mooring.address}</p>
            <div className='boat-button-container'>
                <NotQualifiedButton />
            </div>
            <PricesTable boat={boat} />
            <div id='booking-calendar'>
                <p>Calendar</p>
            </div>


        </div>
    );
};
