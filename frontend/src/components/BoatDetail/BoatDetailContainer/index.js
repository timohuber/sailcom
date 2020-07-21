import React, {useState} from 'react';
import {BookBoatButton} from './buttons'
import {PricesTable} from './prices'
import BoatCalendar from './calendar'
import ButtonsContainer from './buttonsContainer';
import BoatDateTimePicker from "./datepicker";
import BoatDocuments from './documents'
import BoatCarousel from "./carousel";
import BoatTechnicalData from './technicalData'
import BookingForm from '../BookingForm'
import {connect} from "react-redux";
import {smoothScroll} from '../../../lib/helpers/scroll'
import DefaultHeroImage from '../../../assets/default-hero-image.jpg'
import {NavLink} from "react-router-dom";

function BoatDetailContainer(props) {
    const [startDateTime, setStartDateTime] = useState();
    const [endDateTime, setEndDateTime] = useState();
    const [bookingModal, setBookingModal] = useState(false)
    const boat = props.boat
    let instructed = false

    const triggerBookingModal = (e) => {
        e.preventDefault()
        if (!startDateTime || !endDateTime) {
            smoothScroll('.boat-booking-block')
            document.getElementById('datepicker-error').innerText = 'Bitte geben Sie den Zeitraum an'
        } else if (!(startDateTime < endDateTime)) {
            document.getElementById('datepicker-error').innerText = 'Der gewählte Anfang ist nicht vor dem Ende'
        }
        else {
            setBookingModal(true)
            document.getElementById('datepicker-error').innerText = ''
        }
    }

    const closeModal = (e) => {
        e.preventDefault()
        setBookingModal(false)
    }

    const heroImageStyle = {
        backgroundImage: boat.images.length > 0 ? `url(${boat.images[0].image})` : `url(${DefaultHeroImage})`
    }
     if (props.currentUser.authorized) {
        instructed = props.currentUser.userData.instructed_for_models.includes(props.boat.model)
    }

    return (
        <>
        {
            bookingModal ?
            <BookingForm from={startDateTime} until={endDateTime} boat={boat} closeModal={closeModal}/> :
            null
        }
        <div className='hero-image boat' style={heroImageStyle}></div>
        <div className='main-wrapper boat-detail-container'>
            <h1>{boat.title}</h1>
            <p className='subtitle'>{boat.mooring.lake.title}, {boat.mooring.address}</p>

            <ButtonsContainer user={props.currentUser} instructed={instructed} triggerBookingModal={triggerBookingModal}/>

            <PricesTable boat={boat} />
            <div className='detail-description'>
                {boat.detail_description}
            </div>

            <BoatDocuments documents={boat.boat_documents}/>
            <BoatTechnicalData boat={boat}/>

            <BoatCarousel images={boat.images}/>

            <BoatCalendar boat={boat} boatID={boat.id}/>

            {instructed
                ?
                <div className='boat-booking-block'>
                    <h2>Reservierung</h2>
                    <BoatDateTimePicker setStartDateTime={setStartDateTime} setEndDateTime={setEndDateTime}
                                        startDateTime={startDateTime} endDateTime={endDateTime}/>
                    <BookBoatButton triggerBookingModal={triggerBookingModal}/>
                </div>
                : null
            }
            <NavLink className='btn secondary back' to='/bootsliste'>Zurück zur Liste</NavLink>
        </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}
const connection = connect(mapStateToProps);
const ConnectedBoatDetailContainer = connection(BoatDetailContainer);

export default ConnectedBoatDetailContainer;