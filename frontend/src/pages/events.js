import React from 'react';
import EventListContainer from '../components/EventList';
import EventForm from '../components/EventCreate';
import EventEditForm from '../components/EventEdit';

export default function EventPage(props) {
    return (
        <>  
            <EventEditForm />
            <EventForm />
            <EventListContainer />
        </>
    );
}
