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

    return (
        <div className='event-button-container'>
            <DisplayInformationButton toggleModal={toggleModal} />

            {!user.authorized
                ?  <NotLoggedInButton toggleModal={toggleModal} />

                : event.max_participants <= event.participants.length
                    ?  <FullyBookedButton />

                    : event.instructor.id == user.userData.id
                        ? <NavLink to={`/event-bearbeiten/${event.id}/`} className='btn secondary'>Event bearbeiten</NavLink>

                        : event.event_type.is_public || user.userData.is_member
                            ? <ParticipateButton toggleModal={toggleModal} signedUp={event.participants.includes(user.userData.id)}/>
                            : null
            }

        </div>
    );
}
// TODO: user variable instead of fix max participants

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
    };
};
const connection = connect(mapStateToProps);
const ConnectedButtonsContainer = connection(ButtonsContainer);

export default ConnectedButtonsContainer;
