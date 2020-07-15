import React, {useEffect, useState} from 'react';
import {baseUrl} from "../../store/constants";
import {connect} from "react-redux";
import Loading from '../GenericLoading'
import EventsContainer from './eventscontainer'
import EventModal from './modal'

function EventListContainer(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const config = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        }
        const response = fetch(baseUrl + 'event/all/', config)
        .then(res => res.json())
        .then(data => {
            setData(data['results'])
            setLoading(false)
        })
        .catch(response => {
            return
        })
    }, [])

    return (
        <>
            {props.events.activeModal
                ? <EventModal activeModal={props.events.activeModal} event={props.events.modalEvent}/>
                : null
            }
            <h1>Veranstaltungen</h1>
            {loading ?
                <Loading /> : <EventsContainer data={data}/>
            }
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        events: state.events
    }
}
const connection = connect(mapStateToProps);
const ConnectedEventListContainer = connection(EventListContainer);

export default ConnectedEventListContainer;
