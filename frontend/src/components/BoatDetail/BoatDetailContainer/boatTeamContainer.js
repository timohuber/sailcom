import React from 'react';
import BoatTeamMember from './boatTeamMember'

export default function BoatTeamContainer(props) {

    return (
        <div className='boat-team-container'>
            <p><strong>Das Team</strong></p>
            <div className='boat-team-list'>
                {props.members.map(member => {
                    return <BoatTeamMember user={member}/>
                })}
            </div>
        </div>
    );
};