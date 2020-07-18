import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import UserAddressForm from '../components/UserAddress';
import UserDocumentsForm from '../components/UserDocuments';
<<<<<<< HEAD:frontend/src/pages/my-profile.js
import UserTransactions from '../components/UserTransactions'
=======
import Accordion from '../components/Accordion';
>>>>>>> accordion:frontend/src/pages/profile.js
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


    const content = [
        {
            title: 'Adresse',
            content: <UserAddressForm userData={props.userData} />,
        },
        {
            title: 'Dokumente',
            content: <UserDocumentsForm userData={props.userData} />,
        },
        {
            title: 'accordion 3',
            content: 'Lorem ipsum...',
        },
    ];

    // TODO: uncomment create tabs for each component
    return (
        <div className='main-wrapper'>
                {loading ? (
                <Loading />
            ) : (<>
<<<<<<< HEAD:frontend/src/pages/my-profile.js
                <UserDocumentsForm userData={props.userData} />
                <UserAddressForm userData={props.userData} />
                <UserTransactions />
=======
                    <Accordion content={content}/>    
>>>>>>> accordion:frontend/src/pages/profile.js
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
