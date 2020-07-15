import React from "react";
import Event from './event'

export default function EventsContainer(props) {
    return (
        <div className="main-wrapper boat-list">
            {props.data.map(event => {
                return <Event event={event} key={event.id} />
            })}
        </div>
    );
};