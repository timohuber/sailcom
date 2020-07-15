import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import UserAddressForm from '../components/UserAddress';
import Loading from '../components/GenericLoading';
import { fetchUserData } from '../store/actions/loginActions';

function MyProfilePage(props) {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.userData) {
            setUserData(props.userData);
            setLoading(false);
        } else {
            dispatch(fetchUserData());
        }
    }, [props]);

    // TODO: uncomment
    return (
        <div className='main-wrapper'>
            {loading ? <Loading /> : <UserAddressForm userData={props.userData}/>}
            {/* <UserAddressForm /> */}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        userData: state.currentUser.userData,
    };
};
const connection = connect(mapStateToProps);
const ConnectedMyProfilePage = connection(MyProfilePage);

export default ConnectedMyProfilePage;
