import React from 'react';
import EventListContainer from '../components/EventList';
import EventForm from '../components/EventCreate';

export default function EventPage(props) {
    return (
        <>
            <EventForm />
            <EventListContainer />
        </>
    );
}
