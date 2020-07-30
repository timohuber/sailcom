import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUserBookingsAction } from '../../store/actions/userActions';
import {
    dateFromBackendToDisplayString,
    dateToISOString,
} from '../../lib/helpers/formatDates';
import moment from 'moment';

export default function BookingElement(props) {
    const booking = props.booking;
    const dispatch = useDispatch();
    const today = Date.now();

    const onDeleteHandler = (e, booking_id) => {
        e.preventDefault();
        dispatch(deleteUserBookingsAction(booking_id));
    };
    return (
        <div className='user-bookings-list-element'>
            <div className='user-bookings-header'>
                <p className='user-bookings-boat-title'>{booking.boat.title}</p>
                <p>{booking.boat.mooring.lake.title}</p>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td>Von:</td>
                        <td>
                            {dateFromBackendToDisplayString(
                                booking.from_date_time
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>Bis:</td>
                        <td>
                            {dateFromBackendToDisplayString(
                                booking.until_date_time
                            )}
                        </td>
                    </tr>
                    {booking.transaction ? (
                        <tr>
                            <td>Kosten:</td>
                            <td>CHF {booking.transaction.price}</td>
                        </tr>
                    ) : null}
                </tbody>
            </table>
            {dateToISOString(moment(today)) >
            dateToISOString(
                moment(booking.from_date_time).add(-2, 'hours')
            ) ? null : (
                <button
                    className='btn delete'
                    onClick={(e) => onDeleteHandler(e, booking.id)}
                >
                    Buchung stornieren
                </button>
            )}
        </div>
    );
}
