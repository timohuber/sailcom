import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux'

import Hamburger from './hamburger'
import MobileNavigation from "./mobileNavigation";
import logo from "../../assets/logo/logo.png"
import {whereIsCurrentUserCrewMemberAction} from "../../store/actions/eventActions";

const Header = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (!props.whereCrew) {
            dispatch(whereIsCurrentUserCrewMemberAction());
        }
    });

    return (
        <>
        <MobileNavigation whereCrew={props.whereCrew}/>
        <header id='header' className="site-header">
            <NavLink to="/">
                <img className="site-logo" src={logo} alt="logo" />
            </NavLink>
            <Hamburger />
        </header>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        whereCrew: state.events.whereCrew
    }
}
const connection = connect(mapStateToProps);
const ConnectedHeader = connection(Header);

export default ConnectedHeader;