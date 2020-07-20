import React from 'react';
import {NotQualifiedButton, BookBoatButton, ToLoginPageButton, ToEventsPage} from './buttons'
import {connect} from "react-redux";

export default function ButtonsContainer(props) {
    const user = props.user

    return (
        <div className='boat-button-container'>
            {user.authorized === false ?
                <ToLoginPageButton /> :
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