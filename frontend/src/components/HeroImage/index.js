import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroImage(props) {
    return (
        <>
            <section style={props.heroContent.heroStyle} className='heroContainer'>
                <div className='heroContentWrapper'>
                    <h1>{props.heroContent.title}</h1>
                    <h3>{props.heroContent.subtitle}</h3>
                    <Link to={props.heroContent.buttonlink}>
                        <button className='btn primary hero-button'>
                            {props.heroContent.buttontext}
                        </button>
                    </Link>
                </div>
            </section>
        </>
    );
}
