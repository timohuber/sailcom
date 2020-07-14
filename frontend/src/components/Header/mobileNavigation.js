import React from 'react';
import {NavLink} from 'react-router-dom';

import {toggleMobileNavigation} from "./functions";

export default function MobileNavigation(props) {

    // add onclick to all anchors
    const anchors = document.querySelectorAll('#mobile-navigation')
    console.log(anchors)
    for (const anchor of anchors) {
      anchor.addEventListener('click', toggleMobileNavigation())
        anchor.style.color = "red"
    }

    return (
        <div id="mobile-navigation">
            <nav>
                <ul className='level-1'>
                    <li>
                        <NavLink to='/'>SailCom</NavLink>
                        <ul className='level-2'>
                            <li>
                                <NavLink to='/'>Boat Sharing</NavLink>
                            </li>
                            <li>
                                <NavLink to='/'>Genossenschaft</NavLink>
                            </li>
                            <li>
                                <NavLink to='/'>Partner</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <NavLink to='/'>Boote</NavLink>
                        <ul className='level-2'>
                            <li>
                                <NavLink to='/'>Flotte</NavLink>
                            </li>
                            <li>
                                <NavLink to='/'>Standorte</NavLink>
                            </li>
                            <li>
                                <NavLink to='/'>Bootsliste</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <NavLink to='/'>Community</NavLink>
                       <ul className='level-2'>
                            <li>
                                <NavLink to='/'>Information</NavLink>
                            </li>
                            <li>
                                <NavLink to='/'>Veranstaltungen</NavLink>
                            </li>
                            <li>
                                <NavLink to='/'>Sailing Ladies</NavLink>
                            </li>
                            <li>
                                <NavLink to='/'>Race Group</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <NavLink to='/'>Beitreten</NavLink>
                    </li>
                    <li>
                        <NavLink to='/my-profile'>Profil</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};