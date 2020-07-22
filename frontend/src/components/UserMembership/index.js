import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import RequestMembershipForm from './requestMembership'
import ExistingMembership from './existingMembership'
import PendingMembership from './pendingMembership'

import Loading from "../GenericLoading";

function UserMembership(props) {
    const [loading, setLoading] = useState(true)
    const user = props.currentUser

    useEffect(() => {
        if(props.currentUser.authorized) {
            setLoading(false)
        }
    }, [props.currentUser])

    let membershipComponent = <RequestMembershipForm user={user}/>

    if(user.userData.membership_type) {
        membershipComponent = <ExistingMembership user={user} />
    }
    /*
    if(!user.userData.membership_type && user.userData.request_membership) {
        membershipComponent = <PendingMembership user={user} />
    }
     */
    if(true) {
        membershipComponent = <PendingMembership user={user} />
    }
    return (
        <>
        {
            loading
            ? <Loading />
            :
                <div className='main-wrapper'>
                    {membershipComponent}
                </div>
            }
         </>
    );
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}
const connection = connect(mapStateToProps);
const ConnectedUserMembership = connection(UserMembership);

export default ConnectedUserMembership