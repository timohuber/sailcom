import React, {useEffect, useState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Loading from '../../GenericLoading'
import {connect} from "react-redux";

const localizer = momentLocalizer(moment)
// Calendar.momentLocalizer(moment)

function BoatCalendar(props) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        console.log('in use effect')
        const bookings = props.boatlist[props.boatID].bookings
        const events = []

        bookings.forEach(booking => {
            const start_date = booking.from_date_time.split(/[T:-]/)
            const end_date = booking.until_date_time.split(/[T:-]/)

            events.push({
                'title': booking.user.fist_name,
                'start': new Date(start_date[0], parseInt(start_date[1]) - 1, start_date[2], start_date[3], start_date[4]),
                'end': new Date(end_date[0], parseInt(end_date[1]) - 1, end_date[2], end_date[3], end_date[4])
            })
            setData(events)
            setLoading(false)
        })
    }, [props.boatlist])

    return (<>
        {   loading
        ? <Loading />
        :  <div id='boat-calendar'>
            <Calendar
                localizer={localizer}
                // culture={'de-CH'}
                events={data}
                step={60}
                defaultDate={new Date()}
                defaultView='week'
            />
          </div>
       }</>
    );
};


const mapStateToProps = (state) => {
    return {
        boatlist: state.boats.boatlist
    }
}
const connection = connect(mapStateToProps);
const ConnectedBoatCalendar = connection(BoatCalendar);

export default ConnectedBoatCalendar