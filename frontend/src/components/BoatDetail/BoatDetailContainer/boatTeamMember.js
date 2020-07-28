import React from 'react';
import AvatarDefault from '../../../assets/avatar-placeholder.jpg';

export default function BoatTeamMember(props) {
    const user = props.user

    const avatarStyle = {
        backgroundImage: user.avatar
            ? `url(${user.avatar})`
            : `url(${AvatarDefault})`,
    };

    return (
        <div className='boat-team-member'>
            <div style={avatarStyle} className='avatar'/>
            <div className='boat-team-member-content'>
                <p>{user.first_name} {user.last_name}</p>
                <a href={`mailto:${user.email}`}>{user.email}</a>
            </div>
        </div>
    );
};