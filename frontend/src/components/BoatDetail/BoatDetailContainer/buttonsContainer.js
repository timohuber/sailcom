import React from 'react';
import {NotQualifiedButton, BookBoatButton, ToLoginPageButton, ToEventsPage} from './buttons'
import {connect} from "react-redux";

export default function ButtonsContainer(props) {
    const user = props.user

    return (
        <div className='boat-button-container'>
            {user.authorized === false ?
                <ToLoginPageButton boat_id={props.boat_id}/> :
                props.instructed ?
                <BookBoatButton triggerBookingModal={props.triggerBookingModal}/> :
                <>
                    <NotQualifiedButton />
                   <ToEventsPage />
               </>
            }
        </div>
    );
};