import React, {useEffect, useState} from 'react';
import {baseUrl} from "../../store/constants";
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom'
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

    const updateState = event_id => {
        console.log('old state', data)
        const user_id = props.currentUser.userData.id
        let event_index = 0
        data.forEach((item, index) =>{
            if(item.id === event_id) {
                event_index = index;
            }
        })
        let new_participants = data[event_index].participants
        if (new_participants.includes(user_id)) {
            console.log('it contains id')
            new_participants.splice(new_participants.indexOf(user_id), 1);
        } else {
            console.log('it does not contain id')
            new_participants.push(user_id)
        }
        let newState = data
        newState[event_index].participants = new_participants
        console.log('new State', newState)
        setData(newState)
    }

    return (
        <>
            {props.events.activeModal
                ? <EventModal activeModal={props.events.activeModal} event={props.events.modalEvent} updateState={updateState}/>
                : null
            }
            <h1>Veranstaltungen</h1>
            {
                props.currentUser.authorized
                ? <NavLink to='/event-erstellen' className='btn primary create-event'>Event erstellen</NavLink>
                : null
            }
            {loading ?
                <Loading /> : <EventsContainer data={data}/>
            }
            {
                props.currentUser.authorized
                ? <NavLink to='/event-erstellen' className='btn primary create-event'>Event erstellen</NavLink>
                : null
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
