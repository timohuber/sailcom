import React from 'react';
import {NotQualifiedButton, BookBoatButton, ToLoginPageButton, ToEventsPage} from './buttons'
import {connect} from "react-redux";

function ButtonsContainer(props) {
    let instructed = false
    const user = props.user
    const boat = props.boat

    if (user.authorized) {
        instructed = user.userData.instructed_for_models.includes(props.boat.model)
    }

    return (
        <div className='boat-button-container'>
            {user.authorized === false ?
                <ToLoginPageButton /> :
                instructed ?
                <BookBoatButton triggerBookingModal={props.triggerBookingModal}/> :
                <>
                    <NotQualifiedButton />
                   <ToEventsPage />
               </>
            }
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        user: state.currentUser    }
}
const connection = connect(mapStateToProps);
const ConnectedButtonsContainer = connection(ButtonsContainer);

export default ConnectedButtonsContainer;