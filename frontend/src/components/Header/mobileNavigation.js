import React, {useEffect} from 'react';
import {connect, useDispatch} from "react-redux";
import {NavLink} from 'react-router-dom';
import {toggleMobileNavigation} from "./functions";
import {userLogoutAction} from "../../store/actions/userActions";
import backgroundSVG from '../../assets/logo/logo-sailcom.svg'

function MobileNavigation(props) {
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
                                <NavLink to='/events'>Community</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <NavLink to='/bootsliste'>Unsere Boote</NavLink>
                    </li>
                    <li>
                        <NavLink to='/events'>Veranstaltungen</NavLink>
                    </li>
                    {
                        props.authorized
                        ? <>
                                <li><NavLink to='/profil' >Profil</NavLink></li>
                            </>
                        :   <>
                                <li><NavLink to='/login' >Login</NavLink></li>
                                <li><NavLink to='/registrierung' >Beitreten</NavLink></li>
                            </>
                    }
                    {
                        props.is_crew || props.is_staff
                        ?
                            <li>
                                <NavLink to='/mitglieder'>Mitglieder</NavLink>
                            </li>
                        : null
                    }
                    {
                        props.authorized
                        ?  <li><button className='btn secondary logout' onClick={ e => toggleUserLogout(e) }>
                                <i className="fas fa-sign-out-alt"></i>
                                 Logout
                            </button></li>
                        : null
                    }

                </ul>
            </nav>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        is_crew: state.events.is_crew
    }
}
const connection = connect(mapStateToProps);
const ConnectedMobileNavigation = connection(MobileNavigation);

export default ConnectedMobileNavigation;