import React from 'react';
import { NavLink } from 'react-router-dom';

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

export const ToLoginPageButton = (props) => {
    return (
        <NavLink to={`/login/?boot/${props.boat_id}`} className='btn primary'>
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
