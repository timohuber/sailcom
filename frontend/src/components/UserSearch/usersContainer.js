import React from 'react';
import UserPreview from './userPreview';

export default function UsersContainer(props) {
    return (
        <div className='user-list grid-col-3 generic-box-grid'>
            {props.users.map((user) => {
                return <UserPreview user={user} key={user.id} />;
            })}
        </div>
    );
}
