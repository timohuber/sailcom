import React from 'react';

export default function ExistingMembership(props) {
    const user = props.user
    return (
        <>
            <h1>Ihre Mitgliedschaft</h1>
            <p>Typ: {user.userData.membership_type}</p>
        </>
    );
};

