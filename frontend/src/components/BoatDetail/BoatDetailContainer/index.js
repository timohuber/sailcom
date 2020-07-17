import React, {useState} from 'react';
import {NotQualifiedButton, BookBoatButton, ToLoginPageButton, ToEventsPage} from './buttons'
import {PricesTable} from './prices'
import BoatCalendar from './calendar'
import BoatDateTimePicker from "./datepicker";
import BoatDocuments from './documents'
import BoatTechnicalData from './technicalData'
import BookingForm from '../BookingForm'
import {connect} from "react-redux";
import {smoothScroll} from '../../../lib/helpers/scroll'
import DefaultHeroImage from '../../../assets/default-hero-image.jpg'
import LicenceDefault from "../../../assets/pdf.svg";

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
        if (!startDateTime || !endDateTime) {
            smoothScroll('.boat-booking-block')
            document.getElementById('datepicker-error').innerText = 'Bitte geben Sie den Zeitraum an'
        } else {
            setBookingModal(true)
            document.getElementById('datepicker-error').innerText = ''
        }

    }
    const heroImageStyle = {
        backgroundImage: boat.images.length > 0 ? `url(${boat.images[0].image})` : `url(${DefaultHeroImage})`
        // backgroundImage: `url(${DefaultHeroImage})`,
    }

    console.log(boat)
    return (
        <>
        <div className='hero-image boat' style={heroImageStyle}></div>
        <div className='main-wrapper boat-detail-container'>
            <h1>{boat.title}</h1>
            <p className='subtitle'>{boat.mooring.lake.title}, {boat.mooring.address}</p>
            <div className='boat-button-container'>
                {props.authorized === false ?
                    <ToLoginPageButton /> :
                    instructed ?
                    <BookBoatButton triggerBookingModal={triggerBookingModal}/> :
                    <>
                        <NotQualifiedButton />
                       <ToEventsPage />
                   </>
                }
            </div>
            <PricesTable boat={boat} />
            <div className='detail-description'>
                {boat.detail_description}
            </div>
            {
                boat.boat_documents.length > 0
                ? <BoatDocuments documents={boat.boat_documents}/>
                : null
            }
            <BoatTechnicalData boat={boat}/>
            <BoatCalendar boat={boat} />
            <div className='boat-booking-block'>
                <h2>Reservierung</h2>
                <BoatDateTimePicker setStartDateTime={setStartDateTime} setEndDateTime={setEndDateTime} startDateTime={startDateTime} endDateTime={endDateTime}/>

                {props.authorized
                    ? <BookBoatButton triggerBookingModal={triggerBookingModal}/>
                    : null
                }
                {
                    bookingModal ?
                    <BookingForm from={startDateTime} until={endDateTime} boat={boat}/> :
                    null
                }
            </div>
        </div>
        </>
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