import React from 'react';
import {NavLink} from 'react-router-dom';

import {toggleMobileNavigation} from "./functions";

export default function MobileNavigation(props) {

    // add onclick to all anchors
    const anchors = document.querySelectorAll("#mobile-navigation a")
    for (const anchor of anchors) {
        anchor.addEventListener('click', function() {
            toggleMobileNavigation()
        })
    }

    return (
        <div id="mobile-navigation">
            <nav>
                <ul className='level-1'>
                    <li>
                        <NavLink to='/home'>SailCom</NavLink>
                        <ul className='level-2'>
                            <li>
                                <NavLink to='/boat-sharing'>Boat Sharing</NavLink>
                            </li>
                            <li>
                                <NavLink to='/genossenschaft'>Genossenschaft</NavLink>
                            </li>
                            <li>
                                <NavLink to='/'>Partner</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <NavLink to='/bootsliste'>Boote</NavLink>
                        <ul className='level-2'>
                            <li>
                                <NavLink to='/bootsliste'>Flotte</NavLink>
                            </li>
                            <li>
                                <NavLink to='/'>Standorte</NavLink>
                            </li>
                            <li>
                                <NavLink to='/bootsliste'>Bootsliste</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <NavLink to='/information'>Community</NavLink>
                       <ul className='level-2'>
                            <li>
                                <NavLink to='/information'>Information</NavLink>
                            </li>
                            <li>
                                <NavLink to='/events'>Veranstaltungen</NavLink>
                            </li>
                            <li>
                                <NavLink to='/'>Sailing Ladies</NavLink>
                            </li>
                            <li>
                                <NavLink to='/'>Race Group</NavLink>
                            </li>
                        </ul>
                    </li>
                    {
                        props.authorized
                        ? <li><NavLink to='/profil' onClick={ e => toggleMobileNavigation() }>Profil</NavLink></li>
                        :   <>
                                <li><NavLink to='/login' onClick={ e => toggleMobileNavigation() }>Login</NavLink></li>
                                <li><NavLink to='/registrierung'onClick={ e => toggleMobileNavigation() }>Beitreten</NavLink></li>
                            </>
                    }
                </ul>
            </nav>
        </div>
    );
};