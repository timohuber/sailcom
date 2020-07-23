import React from 'react';
import BookingElement from "./bookings";

export default function UserBookingsContainer(props) {
    return (
            <div className='user-bookings-container'>
                {props.bookings.map( booking => {
                    return <BookingElement booking={booking} key={booking.id} />
                })
                }
            </div>
    );
};
