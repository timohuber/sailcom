import React from 'react';

export default function UserAddress(props) {
    const user = props.user
    return (
            <div className='user-address'>
                <h1>{user.first_name} {user.last_name}</h1>
                <p>{user.street}</p>
                <p>{user.address_appendix}</p>
                <p>{user.country}</p>
                <p><a href={`mailto:${user.mail}`}>{user.email}</a></p>
                <p>{user.mobile}</p>
                <p>{user.phone}</p>
            </div>

    );
};
