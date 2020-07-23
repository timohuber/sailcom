import React from 'react';
import { NavLink } from 'react-router-dom';
import { getCurrentUrl } from '../../lib/helpers/getUrlParams';

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
    const url = getCurrentUrl();
    return (
        <NavLink to={`/login/?=${url}`} className='btn disabled'>
            Einloggen
        </NavLink>
    );
};
