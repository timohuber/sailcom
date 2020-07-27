import React, {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import Loading from '../GenericLoading';
import {getUserBookingsAction} from "../../store/actions/userActions";
import {dateFromBackendToDisplayString} from "../../lib/helpers/formatDates"

function BookingsSelect(props) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const dispatch = useDispatch()

    useEffect( () => {
        if(props.bookings) {
            setData(props.bookings)
            setLoading(false)
        } else {
            dispatch(getUserBookingsAction())
        }
    }, [props.bookings])

    return (
         <div className='input-wrapper'>
            <label htmlFor='booking' className='required' >Reservierung</label>
             {
                 loading
                 ? <Loading />
                 :
                    <select
                        id='booking'
                        name='booking'
                        onChange={(e) => props.onChangeHandler(e) }
                    >
                        <option value='' selected disabled hidden>
                            Bitte wählen
                        </option>

                        {
                            data.map(booking => {
                                return (
                                    <option
                                        key={booking.id}
                                        value={booking.id}
                                        data-boat={booking.boat.id}
                                        data-from={booking.from_date_time}
                                        data-until={booking.until_date_time}
                                    >
                                        {dateFromBackendToDisplayString(booking.from_date_time)} - {booking.boat.title}
                                    </option>
                                );
                            })
                        }
                    </select>
                 }
            <span className='error' id='select-error' data-key='booking'/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        bookings: state.currentUser.bookings
    };
};

const connection = connect(mapStateToProps);
const ConnectedBookingsSelect = connection(BookingsSelect);

export default ConnectedBookingsSelect;
