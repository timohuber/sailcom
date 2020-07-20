import React, {useEffect, useState} from 'react';
import {baseUrl, authenticatedGetConfig} from "../../store/constants";
import AvatarDefault from "../../assets/avatar-placeholder.jpg";
import UserAddress from "./address"
import UserBoatsForm from "./userBoatsForm";
import Loading from "../GenericLoading";

export default function UserDetail(props) {
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

    return (
        <div className='main-wrapper'>
        { loading
        ? <Loading />
        :   <>
                <div className='user-detail-avatar user-avatar' style={avatarStyle}></div>
                <UserAddress user={user} />
                <UserBoatsForm user={user} />
            </>
        }
        </div>
    );
};
