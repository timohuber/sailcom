import React from 'react';

import Login from '../components/Login';
import '../App.css';

export default function LoginPage(props) {
    return (
        <div className='main-wrapper'>
            <h1>Login</h1>
            <Login />
        </div>
    );
}
