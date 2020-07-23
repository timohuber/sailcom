import React, {useEffect, useState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Loading from '../../GenericLoading'
import {connect} from "react-redux";
import moment from 'moment'
/*
import moment from 'moment-timezone/moment-timezone'
moment.tz.add("Europe/Zurich|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-19Lc0 11A0 1o00 11A0 1xG10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|38e4");
moment.tz.setDefault("Europe/Zurich");
moment.locale('de-CH')
 */
// Calendar.momentLocalizer(moment)

const localizer = momentLocalizer(moment)

function BoatCalendar(props) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        const bookings = props.boatlist[props.boatID].bookings
        const events = []
        bookings.forEach(booking => {
            // console.log(new Date(booking.from_date_time))
            // console.log('this one', moment(booking.from_date_time, moment.defaultFormat).toDate())

            events.push({
                title: booking.user.fist_name,
                start: new Date(booking.from_date_time),
                end: new Date(booking.until_date_time),
            })
        })

        setData(events)
        setLoading(false)

    }, [props.boatlist])

    return (<>
        {   loading
        ? <Loading />
        :  <div id='boat-calendar'>
            <Calendar
                culture='de-CH'
                localizer={localizer}
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