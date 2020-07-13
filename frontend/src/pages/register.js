import React from 'react';

import Register from '../components/Register';
import '../App.css';

export default function RegistrationPage(props) {
    return (
        <div className='main-wrapper'>
            <h1>Mitglied werden</h1>
            <Register />
        </div>
    );
}
