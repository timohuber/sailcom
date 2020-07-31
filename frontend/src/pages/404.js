import React from 'react';
import { Link } from 'react-router-dom';
import Robot from '../assets/robot.png';

export default function NotFoundPage(props) {
    return (
        <div className='wrapper-404'>
            <div className='inner-404'>
                <div className='left-404'>
                    <h1>404 Error</h1>
                    <h2>Seite nicht gefunden</h2>

                    <Link to='/'>
                        <button className='btn primary' type='submit'>
                            Homepage
                        </button>
                    </Link>
                    <Link to='/events'>
                        <button className='btn primary' type='submit'>
                            Events
                        </button>
                    </Link>
                    <Link to='/bootsliste'>
                        <button className='btn primary' type='submit'>
                            Bootsliste
                        </button>
                    </Link>
                </div>
                <div>
                    <img src={Robot}></img>
                </div>
            </div>
        </div>
    );
}
