import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toggleMobileNavigation } from './functions';
import { userLogoutAction } from '../../store/actions/userActions';
import backgroundSVG from '../../assets/logo/logo-sailcom.svg';

function MobileNavigation(props) {
    const dispatch = useDispatch();

    const toggleUserLogout = (e) => {
        e.preventDefault();
        dispatch(userLogoutAction());
        toggleMobileNavigation();
    };

    const backgroundStyle = {
        backgroundImage: `url(${backgroundSVG})`,
    };
    return (
        <div id='mobile-navigation' style={backgroundStyle}>
            <nav>
                <ul className='level-1'>
                    <li>
                        <NavLink
                            to='/home'
                            onClick={(e) => toggleMobileNavigation()}
                        >
                            SailCom
                        </NavLink>
                        <ul className='level-2'>
                            <li>
                                <NavLink
                                    to='/boat-sharing'
                                    onClick={(e) => toggleMobileNavigation()}
                                >
                                    Boat Sharing
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/genossenschaft'
                                    onClick={(e) => toggleMobileNavigation()}
                                >
                                    Genossenschaft
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/events'
                                    onClick={(e) => toggleMobileNavigation()}
                                >
                                    Community
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <NavLink
                            to='/bootsliste'
                            onClick={(e) => toggleMobileNavigation()}
                        >
                            Unsere Boote
                        </NavLink>
                        <ul className='level-2'>
                            <li>
                                <NavLink
                                    to='/standorte'
                                    onClick={(e) => toggleMobileNavigation()}
                                >
                                    Standorte
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <NavLink
                            to='/events'
                            onClick={(e) => toggleMobileNavigation()}
                        >
                            Veranstaltungen
                        </NavLink>
                    </li>
                    {props.authorized ? (
                        <>
                            <li>
                                <NavLink
                                    to='/profil'
                                    onClick={(e) => toggleMobileNavigation()}
                                >
                                    Profil
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink
                                    to='/login'
                                    onClick={(e) => toggleMobileNavigation()}
                                >
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/registrierung'
                                    onClick={(e) => toggleMobileNavigation()}
                                >
                                    Beitreten
                                </NavLink>
                            </li>
                        </>
                    )}
                    {props.is_crew || props.currentUser.userData.is_staff ? (
                        <li>
                            <NavLink
                                to='/mitglieder'
                                onClick={(e) => toggleMobileNavigation()}
                            >
                                Mitglieder
                            </NavLink>
                        </li>
                    ) : null}
                    {props.authorized ? (
                        <li>
                            <button
                                className='btn secondary logout'
                                onClick={(e) => toggleUserLogout(e)}
                            >
                                <i className='fas fa-sign-out-alt'></i>
                                Logout
                            </button>
                        </li>
                    ) : null}
                </ul>
            </nav>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        authorized: state.currentUser.authorized,
        is_crew: state.events.is_crew,
        currentUser: state.currentUser,
    };
};
const connection = connect(mapStateToProps);
const ConnectedMobileNavigation = connection(MobileNavigation);

export default ConnectedMobileNavigation;
