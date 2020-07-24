import React from 'react';
import { connect } from 'react-redux';

import RegisterForm from '../components/RegisterForm';
import ConfirmationMessage from '../components/ConfirmationMessage/register';

function RegistrationPage(props) {
    return (
        <div className='main-wrapper'>
            {props.currentUser.registration.verificationCodeRequested ? (
                <ConfirmationMessage />
            ) : (
                <RegisterForm />
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
    };
};
const connection = connect(mapStateToProps);
const ConnectedRegistrationPage = connection(RegistrationPage);

export default ConnectedRegistrationPage;
