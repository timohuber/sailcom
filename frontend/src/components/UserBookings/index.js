import React, {useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import Loading from "../GenericLoading";
import {getUserBookingsAction} from '../../store/actions/userActions'

function UserBookings(props) {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    // TODO
    // Use correct endpoint

    useEffect( () => {
        if(props.bookings) {
            setLoading(false)
        } else {
            dispatch(getUserBookingsAction())
        }
    }, [props.bookings])

    const user = props.user
    return (
            <div className='user-bookings'>
                <h2>Ihre Buchungen</h2>
                {
                    loading
                    ? <Loading />
                    : <p>Buchungen..........</p>
                }
            </div>
    );
};

const mapStateToProps = (state) => {
    return {
        bookings: state.currentUser.bookings,
    }
}
const connection = connect(mapStateToProps);
const ConnectedUserBookings = connection(UserBookings);

export default ConnectedUserBookings;