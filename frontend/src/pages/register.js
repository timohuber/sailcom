import React from 'react';
import { connect } from 'react-redux';

import RegisterForm from '../components/RegisterForm';
import VerificationForm from "../components/VerificationForm"; 
import '../App.css';

function RegistrationPage(props) {
    console.log(props)
    return (
        <div className='main-wrapper'>
            {props.currentUser.registration.verificationCodeRequested ? (
                <VerificationForm />
            ) : (
                <RegisterForm />
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    console.log('in register.js', state)
    return {
        currentUser: state.currentUser,
    };
};
const connection = connect(mapStateToProps);
const ConnectedRegistrationPage = connection(RegistrationPage);

export default ConnectedRegistrationPage;
