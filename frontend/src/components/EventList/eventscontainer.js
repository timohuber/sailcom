import React from "react";
import Event from './event'
import {NavLink} from "react-router-dom";

export default function EventsContainer(props) {
    return (
        <div className="main-wrapper narrow event-list">
            {}
            {props.data.map(event => {
                return <Event event={event} key={event.id} />
            })}
        </div>
    );
};

