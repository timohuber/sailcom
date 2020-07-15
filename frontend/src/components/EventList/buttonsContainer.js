import React from "react";
import {connect, useDispatch} from "react-redux";
import {DisplayInformationButton, FullyBookedButton, ParticipateButton, NotLoggedInButton} from './buttons'
import {setEventModalAction} from '../../store/actions/eventActions'

function ButtonsContainer(props) {
    const dispatch = useDispatch()
    const user = props.currentUser
    const event = props.event

    const toggleModal = (e, modal) => {
        e.preventDefault()
        dispatch(setEventModalAction(modal, event))
    }

    return (
        <div className='event-button-container'>
            <DisplayInformationButton toggleModal={toggleModal}/>
            {!user.authorized
                ? <NotLoggedInButton toggleModal={toggleModal}/>
                : <ParticipateButton toggleModal={toggleModal}/>
            }
        </div>
    )
}
// TODO: user variable instead of fix max participants

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}
const connection = connect(mapStateToProps);
const ConnectedButtonsContainer = connection(ButtonsContainer);

export default ConnectedButtonsContainer;

