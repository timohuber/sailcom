import React from 'react';
import { Link } from 'react-router-dom';
import Robot from '../assets/robot.png';

export default function NotFoundPage(props) {
    // const backgroundStyle = {
    //     // backgroundImage: `url(https://images.unsplash.com/photo-1592162985416-38009bef258e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)`
    //     backgroundImage: `url(${Boat})`,
    // }

    // style={backgroundStyle}
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
