import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import RequestMembershipForm from './requestMembership'
import Loading from "../GenericLoading";

function UserMembership(props) {
    const [loading, setLoading] = useState(true)
    const user = props.currentUser
    useEffect(() => {
        if(props.currentUser.authorized) {
            setLoading(false)
        }
    }, [props.currentUser])

    return (
        <>
        {
            loading
            ? <Loading />
            :
                <div className='main-wrapper'>{
                    user.membership_type
                    ? <p>Sie sind bereits Mitglied</p>
                    :  <RequestMembershipForm user={user}/>
                }</div>
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