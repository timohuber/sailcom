import React from 'react';
import {NotQualifiedButton} from './buttons'
import {PricesTable} from './prices'
import BoatCalendar from './calendar'
import {connect} from "react-redux";

export default function BoatDetailContainer(props) {
    const boat = props.boat
    console.log(props.user)

    return (
        <div className='main-wrapper boat-detail-container'>
            <h1>{boat.title}</h1>
            <p className='subtitle'>{boat.mooring.lake.title}, {boat.mooring.address}</p>
            <div className='boat-button-container'>
                <NotQualifiedButton />
            </div>
            <PricesTable boat={boat} />
            <BoatCalendar boat={boat} />
        </div>
    );
};