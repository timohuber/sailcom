import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import UserAddressForm from '../components/UserAddress';
import UserDocumentsForm from '../components/UserDocuments';
import UserTransactions from '../components/UserTransactions'
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

    // TODO: uncomment create tabs for each component
    return (
        <div className='main-wrapper'>
                {loading ? (
                <Loading />
            ) : (<>
                <UserDocumentsForm userData={props.userData} />
                <UserAddressForm userData={props.userData} />
                <UserTransactions />
                </>
            )}
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
