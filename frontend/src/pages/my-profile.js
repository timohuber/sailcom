import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import UserAddressForm from '../components/UserAddress';

function MyProfilePage(props) {
    
    useEffect(() => {
        console.log("user_id", user_id);
        getUserCommentsAction(user_id);
      }, [getUserCommentsAction]);
    

    return (
        <div className='main-wrapper'>
            <UserAddressForm />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
    };
};
const connection = connect(mapStateToProps);
const ConnectedMyProfilePage = connection(MyProfilePage);

export default ConnectedMyProfilePage;