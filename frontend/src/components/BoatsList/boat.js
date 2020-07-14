import React from "react";
import {NavLink} from "react-router-dom";

export default function Boat(props) {
    const boat = props.boat
    const imageStyle = {
        backgroundImage: 'url(https://www.boat-school.ch/templates/yootheme/cache/segelboot-280d37a9.jpeg)'
    }
    return (
            <article className='boat-list-element'>
                <NavLink to='/'>
                    <div className='boat-list-image' style={imageStyle} />
                    <div className='boat-list-body'>
                        <h3>{boat.title}</h3>
                        <p className='mooring'>{boat.mooring.lake.title} {boat.mooring.address}</p>
                    </div>
                </NavLink>
            </article>
    );
};