import React from 'react';
import { NavLink } from 'react-router-dom';
import { getCurrentUrl } from '../../../lib/helpers/getUrlParams';

export const NotQualifiedButton = () => {
    return <button className='btn disabled'>Nicht qualifiziert</button>;
};

export const BookBoatButton = (props) => {
    return (
        <button
            className='btn primary'
            onClick={(e) => props.triggerBookingModal(e)}
        >
            Reservieren
        </button>
    );
};

export const ToLoginPageButton = () => {
    const url = getCurrentUrl();
    return (
        <NavLink to={`/login/?=${url}`} className='btn primary'>
            Login
        </NavLink>
    );
};

export const ToEventsPage = () => {
    return (
        <NavLink to='/events' className='btn primary'>
            Events ansehen
        </NavLink>
    );
};
