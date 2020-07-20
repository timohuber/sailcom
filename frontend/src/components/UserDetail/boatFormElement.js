import React, {useEffect} from 'react';

export default function BoatFormElement(props) {
    const boat = props.boat
    const user = props.user
    return (
        <div className='boat-form-list-element'>
            <p>{boat.title}</p>
            <p>{boat.mooring.lake.title}</p>
            <span
                onClick={ e => props.toggleUserHandler(boat.model) }
                className={
                    user.instructed_for_models.includes(boat.model)
                    ? 'toggle-instructed instructed'
                    : 'toggle-instructed'
                }
             />
        </div>
    );
};

