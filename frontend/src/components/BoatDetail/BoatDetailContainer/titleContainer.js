import React from "react";

export default function TitleContainer(props) {
    const boat = props.boat;
    return (
            <div className='boat-title-container'>
                <h1>{boat.title}</h1>
                <p>{boat.mooring.lake.title}</p>
                <p>{boat.mooring.address}</p>
            </div>
    );
}
