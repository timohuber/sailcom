import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import Loading from '../GenericLoading';
import UserBookingsContainer from './bookingsContainer';
import { getUserBookingsAction } from '../../store/actions/userActions';

function UserBookings(props) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.bookings) {
            setData(props.bookings);
            setLoading(false);
        } else {
            dispatch(getUserBookingsAction());
        }
    }, [props.bookings]);

    return (
        <div className='user-bookings'>
            <h2>Ihre Buchungen</h2>
            {loading ? <Loading /> : <UserBookingsContainer bookings={data} />}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        bookings: state.currentUser.bookings,
    };
};
const connection = connect(mapStateToProps);
const ConnectedUserBookings = connection(UserBookings);

export default ConnectedUserBookings;
