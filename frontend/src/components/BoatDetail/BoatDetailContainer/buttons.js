import React from "react";
import {NavLink} from "react-router-dom";

export const NotQualifiedButton = () => {
        return (
        <button className='btn primary'>Nicht qualifiziert</button>
    );
}

export const BookBoatButton = (props) => {
    return (
        <button className='btn primary' onClick={ e => props.triggerBookingModal(e) }>Buchen</button>
    );
}

export const ToLoginPageButton = () => {
        return (
        <NavLink to='/login' className='btn primary'>Login</NavLink>
    );
}