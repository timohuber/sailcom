import React, {useEffect, useState} from 'react';
import Loading from '../../GenericLoading'
import BookingSuccess from './success'
import {connect} from "react-redux";
import {baseUrl} from "../../../store/constants";
import {dateToISOString, dateToDisplayString} from '../../../lib/helpers/formatDates'

function BookingForm(props) {
    const [calculatedPrice, setCalculatedPrice] = useState();
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    const from = dateToISOString(props.from)
    const until = dateToISOString(props.until)

    /*
    console.log('props.from', props.from)
    console.log('props.until', props.until)
    console.log('from - display', dateToDisplayString(from))
    console.log('until - display', dateToDisplayString(until))
    console.log('ISO', from)
    console.log('ISO', until)
    */

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
        e.preventDefault()

        const response = fetch(baseUrl + 'booking/', config)
        .then(res => {
            if(!res.ok) {
                throw res
            }
            if (res.status === 201) {
                setSuccess(true)
            }
            return res.json()
        })
        .then(data => {
        })
        .catch(error => {
            error.text().then( errorMessage => {
                document.getElementById('booking-error').innerText = errorMessage
            })
        })
    }
    console.log(calculatedPrice)
    return (
        <div className='modal'>
            <div className='inner'>
                {
                    loading
                    ? <Loading />
                    :
                        <div className='boat-booking-form'>
                            <h1>Abschluss</h1>
                            <table className='simple'>
                                <tbody>
                                    <tr>
                                        <td>
                                            Schiff:
                                        </td>
                                        <td>
                                            {props.boat.title}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Von
                                        </td>
                                        <td>
                                            {from}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Bis
                                        </td>
                                        <td>
                                            {until}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Total
                                        </td>
                                        <td>
                                            {calculatedPrice}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <p id='booking-error' className='error'></p>
                            {success
                            ? <BookingSuccess />
                            : <button className='btn primary' onClick={e => submitHandler(e)}>Buchung abschliessen</button>
                            }
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

/*
*                 // res.text().then(text => {
                    throw new Error("Not 2xx response");
                // })
*
* */