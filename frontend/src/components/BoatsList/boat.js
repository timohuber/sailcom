import React from "react";
import {NavLink} from "react-router-dom";
import ListButtonsContainer from './boatButtons'

export default function Boat(props) {
    const boat = props.boat
    let imageStyle = {}
    if (boat.images.length > 0) {
        imageStyle = {
            backgroundImage: `url(${boat.images[0].image})`
        }
    }
    return (
            <article className='boat-list-element generic-box'>
                <div className='boat-list-image' style={imageStyle} />
                <div className='boat-list-body'>
                    <p className='upper-subtitle'>Day Easy</p>
                    <h3>{boat.title}</h3>
                    <div className='location'>
                        <p className='mooring'>{boat.mooring.address}</p>
                        <p className='lake'>{boat.mooring.lake.title}</p>
                    </div>
                    <div className='description'>{boat.description}</div>
                    <ListButtonsContainer boat={boat}/>
                </div>
            </article>
    );
};