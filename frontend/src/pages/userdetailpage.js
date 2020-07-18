import React from 'react';
import UserDetail from '../components/UserDetail'

export default function UserDetailPage(props) {
     return (
        <UserDetail match={props.match}/>
    );
}
