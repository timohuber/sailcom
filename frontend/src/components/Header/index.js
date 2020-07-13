import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'

import Hamburger from './hamburger'
import MobileNavigation from "./mobileNavigation";
import logo from "../../assets/logo/logo.png"

const Header = (props) => {
    return (
        <>
        <MobileNavigation />
        <header className="site-header">
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
        authorized: state.currentUser.authorized
    }
}
const connection = connect(mapStateToProps);
const ConnectedHeader = connection(Header);

export default ConnectedHeader;