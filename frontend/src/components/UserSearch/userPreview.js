import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import AvatarDefault from "../../assets/avatar-placeholder.jpg";

export default function UserPreview(props) {
    const user = props.user
    const avatarStyle = {
        backgroundImage: user.avatar
            ? `url(${user.avatar})`
            : `url(${AvatarDefault})`,
    };
    return (
        <article className='user-list-element'>
            <NavLink to={`/mitglied/${user.id}`}>
                <div className='user-list-avatar user-avatar' style={avatarStyle}></div>
            </NavLink>
            <div className='user-list-body'>
                <h3>{user.first_name} {user.last_name}</h3>
                <p>{user.email}</p>
            </div>
        </article>
    );
};
