import React from 'react';
import EventListContainer from '../components/EventList';

// hero image
import HeroImage from '../components/HeroImage';
import BgImage from '../assets/boat-wooden-deck.jpg';
const heroContent = {
    title: 'Events',
    subtitle:
        'Spezialevents - vom gemeinsamen Abendsegeln bis zu mehrtägigen Ausflügen.',
    buttontext: 'Boote anschauen',
    buttonlink: '/bootsliste',
    heroStyle: {
        backgroundImage: `url(${BgImage})`,
    },
};

export default function EventPage(props) {
    return (
        <>
            <HeroImage heroContent={heroContent} />
            <EventListContainer />
        </>
    );
}
