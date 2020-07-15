import React, {useState} from 'react';
import {NotQualifiedButton, BookBoatButton, ToLoginPageButton} from './buttons'
import {PricesTable} from './prices'
import BoatCalendar from './calendar'
import BoatDateTimePicker from "./datepicker";
import BookingForm from '../BookingForm'
import {connect} from "react-redux";

function BoatDetailContainer(props) {
    const [startDateTime, setStartDateTime] = useState();
    const [endDateTime, setEndDateTime] = useState();
    const [bookingModal, setBookingModal] = useState(false)

    const boat = props.boat
    const user = props.user
    let instructed = false

    if (props.authorized) {
        instructed = user.instructed_for_models.includes(boat.model)
    }

    const triggerBookingModal = (e) => {
        e.preventDefault()
        setBookingModal(true)
    }

    return (
        <div className='main-wrapper boat-detail-container'>
            <h1>{boat.title}</h1>
            <p className='subtitle'>{boat.mooring.lake.title}, {boat.mooring.address}</p>
            <div className='boat-button-container'>
                {props.authorized === false ?
                    <ToLoginPageButton /> :
                    instructed ?
                    <BookBoatButton triggerBookingModal={triggerBookingModal}/> :
                    <NotQualifiedButton />
                }
            </div>
            <PricesTable boat={boat} />
            <BoatDateTimePicker setStartDateTime={setStartDateTime} setEndDateTime={setEndDateTime} startDateTime={startDateTime} endDateTime={endDateTime}/>
            <BoatCalendar boat={boat} />
            {
                bookingModal ?
                <BookingForm from={startDateTime} until={endDateTime} boat={boat}/> :
                null
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        authorized: state.currentUser.authorized
    }
}
const connection = connect(mapStateToProps);
const ConnectedBoatDetailContainer = connection(BoatDetailContainer);

export default ConnectedBoatDetailContainer;