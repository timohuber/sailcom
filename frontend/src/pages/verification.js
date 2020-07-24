import React from 'react';
import { connect } from 'react-redux';
import ConfirmationVerification from '../components/ConfirmationMessage/verification';
import VerificationForm from '../components/VerificationForm';

function VerificationPage(props) {
    return (
        <div className='main-wrapper'>
            {props.currentUser.registration.verificationConfirmed ? (
                <ConfirmationVerification />
            ) : (
                <VerificationForm />
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
const ConnectedVerificationPage = connection(VerificationPage);

export default ConnectedVerificationPage;
