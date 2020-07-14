import React from 'react';

export default function BoatDetailContainer(props) {
    const boat = props.boat

    return (
        <div className='main-wrapper'>
            <h1>{boat.title}</h1>
        </div>
    );
};
