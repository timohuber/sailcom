import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {Calendar} from "react-big-calendar";


export default function BoatCarousel(props) {
    if(!props.images.length) {
        return null
    }

    return (
        <div className='boat-carousel'>
            <Carousel>
                {props.images.map(image => {
                    const style = {
                        backgroundImage: `url(${image.image})`
                    }
                    return (
                        <div style={style}>
                        </div>
                        )
                })}
            </Carousel>
        </div>
    );
};
