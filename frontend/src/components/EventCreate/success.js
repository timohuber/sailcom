import React from "react";
import {NavLink} from "react-router-dom";
import { ReactComponent as SuccessIcon } from '../../assets/icons/success.svg'

export default function EventCreateSuccess(props) {
    return (
        <>
            <h1>Event wurde erfolgreich angelegt</h1>
            <SuccessIcon />
            <NavLink className='btn secondary back' to='/events'>Zurück zur Liste</NavLink>
        </>
    )
}