import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {NavLink} from 'react-router-dom';
import {toggleMobileNavigation} from "./functions";
import {userLogoutAction} from "../../store/actions/userActions";
import backgroundSVG from '../../assets/logo/logo-sailcom.svg'

export default function MobileNavigation(props) {
    const dispatch = useDispatch()
    // add onclick to all anchors
    useEffect(() => {
        const anchors = document.querySelectorAll("#mobile-navigation a")
        for (const anchor of anchors) {
            anchor.addEventListener('click', function() {
                toggleMobileNavigation()
            })
        }
    }, []);

    const toggleUserLogout = e => {
        e.preventDefault()
       dispatch(userLogoutAction())
    }

    const backgroundStyle = {
        backgroundImage: `url(${backgroundSVG})`
    }

    return (
        <div id="mobile-navigation" style={backgroundStyle}>
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
                        ? <>
                                <li><NavLink to='/profil' >Profil</NavLink></li>
                                <li><button className='btn secondary' onClick={ e => toggleUserLogout(e) }>Logout</button></li>
                            </>
                        :   <>
                                <li><NavLink to='/login' >Login</NavLink></li>
                                <li><NavLink to='/registrierung' >Beitreten</NavLink></li>
                            </>
                    }
                </ul>
            </nav>
        </div>
    );
};