import React from 'react';
import { NavLink } from 'react-router-dom';

export const DisplayInformationButton = (props) => {
    return (
        <button
            className='btn primary'
            onClick={(e) => props.toggleModal(e, 'information')}
        >
            Mehr erfahren
        </button>
    );
};

export const FullyBookedButton = () => {
    return <button className='btn disabled'>Ausgebucht</button>;
};

export const ParticipateButton = (props) => {
    return (
        <button
            className={`btn ${props.signedUp ? 'disabled' : 'primary'}`}
            onClick={(e) => props.toggleModal(e, 'participate')}
        >
            {props.signedUp ? 'Abmelden' : 'Teilnehmen'}
        </button>
    );
};

export const NotLoggedInButton = () => {
    return (
        <NavLink to={`/login/?events`} className='btn disabled'>
            Einloggen
        </NavLink>
    );
};
