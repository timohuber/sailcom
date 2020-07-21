import React from 'react';
import EventEditForm from '../components/EventEdit';

export default function EditEventPage(props) {
    return (
        <>  
            <EventEditForm match={props.match}/>
        </>
    );
}
