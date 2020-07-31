import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import UserAddressForm from '../components/UserAddress';
import UserDocumentsForm from '../components/UserDocuments';
import UserMembership from '../components/UserMembership';
import UserTransactions from '../components/UserTransactions';
import UserBookings from '../components/UserBookings';
import Accordion from '../components/Accordion';
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
    }, [props.userData]);

    const content = [
        {
            title: 'Adresse',
            content: <UserAddressForm userData={props.userData} />,
        },
        {
            title: 'Mitgliedschaft',
            content: <UserMembership userData={props.userData} />,
        },
        {
            title: 'Dokumente',
            content: <UserDocumentsForm userData={props.userData} />,
        },
        {
            title: 'Buchungen',
            content: <UserBookings />,
        },
        {
            title: 'Transaktionen',
            content: <UserTransactions />,
        },
    ];

    return (
        <div className='main-wrapper'>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <h1>Hallo {props.userData.first_name}</h1>
                    <Accordion content={content} />
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
