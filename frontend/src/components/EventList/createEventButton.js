import React from "react";
import {NavLink} from "react-router-dom";

export default function CreateEventButton(props) {
    return (
            <>{
                props.authorized
                    ? props.is_member || props.is_crew
                        ? <NavLink to='/event-erstellen' className='btn primary create-event'>Event erstellen</NavLink>
                        : null
                    : null
            }</>
    );
};

