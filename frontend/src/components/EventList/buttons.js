import React from "react";
import {NavLink} from "react-router-dom";

export const DisplayInformationButton = (props) => {
    return (
        <button className='btn primary' onClick={ e => props.toggleModal(e, 'information')}>Mehr erfahren</button>
    );
}

export const FullyBookedButton = () => {
    return (
        <button className='btn disabled'>Ausgebucht</button>
    );
}

export const ParticipateButton = (props) => {
    return (
        <button className='btn primary' onClick={ e => props.toggleModal(e, 'participate')} >Teilnehmen</button>
    );
}

export const NotLoggedInButton = () => {
    return (
        <NavLink to='/login' className='btn disabled'>Anmelden</NavLink>
    );
}