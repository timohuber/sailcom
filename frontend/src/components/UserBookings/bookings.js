import React from 'react';
import {useDispatch} from "react-redux";
import {deleteUserBookingsAction} from '../../store/actions/userActions'

export default function BookingElement(props) {
    const booking = props.booking
    const dispatch = useDispatch()

    const onDeleteHandler = (e, booking_id) => {
        e.preventDefault()
        dispatch(deleteUserBookingsAction(booking_id))
    }
    return (
            <div className='user-bookings-list-element'>
                <p className='user-booking-boat'>{booking.boat.title}</p>
                <p className='user-booking-lake'>{booking.boat.mooring.lake.title}</p>
                <p>{booking.from_date_time} bis {booking.until_date_time}</p>
                <p>CHF 20.00</p>
                <button className='btn delete' onClick={ e => onDeleteHandler(e, booking.id )}>Buchung stornieren</button>
            </div>
    );
};
