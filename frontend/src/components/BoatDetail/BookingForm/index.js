import React, {useEffect, useState} from 'react';
import Loading from '../../GenericLoading'
import GenericModalClose from '../../GenericModal/close'
import BookingSuccess from './success'
import BookingSummary from './bookingSummary'
import {connect, useDispatch} from "react-redux";
import {baseUrl} from "../../../store/constants";
import {dateToISOStringWithZ} from '../../../lib/helpers/formatDates'
import {addBookingToBoatAction} from "../../../store/actions/boatActions";

function BookingForm(props) {
    const dispatch = useDispatch()
    const [calculatedPrice, setCalculatedPrice] = useState();
    const [loading, setLoading] = useState(true);
    const [requestPending, setRequestPending] = useState(false);
    const [success, setSuccess] = useState(false);

    const from = dateToISOStringWithZ(props.from)
    const until = dateToISOStringWithZ(props.until)

    const config = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }),
        body: JSON.stringify({
            from_date_time: from,
            until_date_time: until,
            boat: props.boat.id
        }),
    }

    useEffect(() => {
        const response = fetch(baseUrl + 'booking/calculate/', config)
        .then(res => res.json())
        .then(data => {
            setCalculatedPrice(data);
            setLoading(false)
        })
        .catch(error => {
            console.log('in error', error)
        })
    }, [])

    const submitHandler = e => {
        e.preventDefault();
        setRequestPending(true);
        const response = fetch(baseUrl + 'booking/', config)
        .then(res => {
            if(!res.ok) {
                throw res
            }
            if (res.status === 201) {
                setSuccess(true);
                setRequestPending(false);
            }
            return res.json()
        })
        .then(data => {
            dispatch(addBookingToBoatAction(data))
            props.setStartDateTime(null)
            props.setEndDateTime(null)
        })
        .catch(error => {
            if(error.status === 400) {
                error.text().then( errorMessage => {
                    document.getElementById('booking-error').innerText = errorMessage
                })
            }
        })
    }
    return (
        <div className='modal'>
            <div className='inner'>
                <GenericModalClose onClick={props.closeModal}/>
                {
                    loading
                    ? <Loading />
                    : success
                        ? <BookingSuccess closeModal={props.closeModal}/>
                        : <div className='boat-booking-form'>
                            <h1>Abschluss</h1>
                            <BookingSummary
                                boat={props.boat}
                                calculatedPrice={calculatedPrice}
                                from={props.from}
                                until={props.until}
                            />
                            <p id='booking-error' className='error'></p>
                            <div className='modal-buttons-wrapper'>
                                <button className='btn secondary' onClick={ e => props.closeModal(e) }>Abbrechen</button>
                                {
                                    requestPending ?
                                    <button className='btn primary pending'></button> :
                                    <button className='btn primary' onClick={e => submitHandler(e)}>Buchung abschliessen</button>
                                }

                            </div>
                        </div>
                    }
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser    }
}
const connection = connect(mapStateToProps);
const ConnectedBookingForm = connection(BookingForm);

export default ConnectedBookingForm;
