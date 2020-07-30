import React from 'react';
import { toggleMobileNavigation } from './functions';

export default function Hamburger(props) {
    return (
        <div id='mobile-menu' onClick={(e) => toggleMobileNavigation()}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}
