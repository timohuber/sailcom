import React from 'react';
import {connect} from "react-redux";
import {baseUrl} from "../../../store/constants";

function BookingForm(props) {
    const duration = ((props.until - props.from) / 3600000)
    const totalPrice = props.boat.price_hour_weekday * duration

    const submitHandler = e => {
        e.preventDefault()

        const config = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }),
            body: JSON.stringify({
                from_date_time: props.from.toISOString(),
                until_date_time: props.until.toISOString(),
                boat: props.boat.id
            }),
        }
        const response = fetch(baseUrl + 'booking/', config)
        .then(res => {
            console.log(res)
            return res.json()
        })
        .then(data => {
        })
        .catch(response => {
            return
        })
    }

    return (
        <div className='modal'>
            <div className='booking-form'>
                <h1>Abschluss</h1>
                <table>
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
                                {props.from.toISOString()}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Bis
                            </td>
                            <td>
                                {props.until.toISOString()}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Total
                            </td>
                            <td>
                                {totalPrice}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className='btn primary' onClick={e => submitHandler(e)}>Buchung abschliessen</button>
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