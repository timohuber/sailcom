import React from 'react';

export default function ExistingMembership(props) {
    const user = props.user
    return (
        <>
            <h2>Ihre Mitgliedschaft</h2>
            <p>Typ: {user.userData.membership_type}</p>
        </>
    );
};

