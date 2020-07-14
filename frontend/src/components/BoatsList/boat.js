import React from "react";

export default function Boat(props) {
    const boat = props.boat
    const imageStyle = {
        backgroundImage: 'url(https://www.boat-school.ch/templates/yootheme/cache/segelboot-280d37a9.jpeg)'
    }
    return (
            <article className='boat-list-element'>
                <div className='boat-list-image' style={imageStyle} />
                <div className='boat-list-body'>
                    <h3>{boat.title}</h3>
                    <p>{boat.lake}</p>
                </div>
            </article>
    );
};