import React, {useEffect, useState} from 'react';
import {baseUrl, authenticatedGetConfig} from "../../store/constants";
import AvatarDefault from "../../assets/avatar-placeholder.jpg";
import UserAddress from "./address"
import UserBoatsForm from "./userBoatsForm";
import UserEditMembership from './editMembership';
import Loading from "../GenericLoading";
import {connect} from "react-redux";

function UserDetail(props) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const userID = props.match.params.id

     useEffect(() => {
        const response = fetch(baseUrl + 'user/'+ userID + '/', authenticatedGetConfig)
        .then(res => res.json())
        .then(data => {
            setUser(data);
            setLoading(false)
        })
        .catch(response => {
            return
        })
    }, [])

    const avatarStyle = {
        backgroundImage: user.avatar
            ? `url(${user.avatar})`
            : `url(${AvatarDefault})`,
    };

    //

    return (
        <div className='main-wrapper narrow'>
            {loading
                ? <Loading/>
                : <>
                    <div className='user-detail-avatar user-avatar' style={avatarStyle}/>
                    <UserAddress user={user}/>
                    <UserBoatsForm user={user}/>
                    {
                        props.currentUser.is_staff
                        ? <UserEditMembership user={user}/>
                        : null
                    }
                </>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.userData,
    }
}
const connection = connect(mapStateToProps);
const ConnectedUserDetail = connection(UserDetail);

export default ConnectedUserDetail;