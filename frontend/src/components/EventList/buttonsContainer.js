import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
    DisplayInformationButton,
    FullyBookedButton,
    ParticipateButton,
    NotLoggedInButton,
} from './buttons';
import { setEventModalAction } from '../../store/actions/eventActions';

function ButtonsContainer(props) {
    const dispatch = useDispatch();
    const user = props.currentUser;
    const event = props.event;

    const toggleModal = (e, modal) => {
        e.preventDefault();
        dispatch(setEventModalAction(modal, event));
    };
    console.log('buttons', event)
    return (
        <div className='event-button-container'>
            <DisplayInformationButton toggleModal={toggleModal} />

            {!user.authorized
                ?  <NotLoggedInButton toggleModal={toggleModal} />

                : event.instructor.id == user.userData.id
                        ? <NavLink to={`/event-bearbeiten/${event.id}/`} className='btn secondary'>Event bearbeiten</NavLink>

                    : event.event_type.is_public || user.userData.is_member
                        ? <ParticipateButton toggleModal={toggleModal} signedUp={event.participants.includes(user.userData.id)}/>

                        : event.max_participants <= event.participants.length
                            ?  <FullyBookedButton />
                            : null
            }

        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        activeModal: state.events.activeModal
    };
};
const connection = connect(mapStateToProps);
const ConnectedButtonsContainer = connection(ButtonsContainer);

export default ConnectedButtonsContainer;
