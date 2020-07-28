import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom'
import Loading from '../GenericLoading'
import EventsContainer from './eventscontainer'
import EventModal from './modal'
import EventListFilter from './Filter'
import Accordion from "../Accordion";
import Axios from "../../axios";

function EventListContainer(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibilityFilter, setVisibilityFilter] = useState()

     useEffect(() => {
        const fetchBoats = async () => {
            let url = 'event/'

            if (visibilityFilter) {
                url += visibilityFilter
            }
            try {
                const response = await Axios.get(url);
                setData(response.data.results)
                setLoading(false)
                return response;
            } catch (error) {
                if(error.response) {
                    console.log(error.response.data)
                }
            }
       }
       fetchBoats()
    }, [visibilityFilter])

    const updateState = eventID => {
        console.log(eventID)
        console.log(data)

        let arrayIndex = null
        data.forEach((event, index) => {
            if(event.id == eventID) {
                arrayIndex = index
            }
        })
        console.log(arrayIndex)
        console.log(data[arrayIndex])
        const participantsArray = data[arrayIndex].participants
        const userID = props.currentUser.userData.id

        if(participantsArray.includes(userID)) {
            const index = participantsArray.indexOf(userID);
            participantsArray.splice(index, 1);
        } else {
            participantsArray.push(userID)
        }

    }

 const resetFilter = (e) => {
        e.preventDefault()
        setVisibilityFilter(null)
    }

    const submitFilterHandler = (e, filterQuery) => {
        e.preventDefault()
        let count = 0
        let query = '?'
        for (const [key, value] of Object.entries(filterQuery)) {
            if(value) {
                query += `${key}=${value}&`
                count++
            }
        }
        const searchURL = query.slice(0, -1)
        if(count > 0) {
            setVisibilityFilter(searchURL)
        } else {
            resetFilter(e)
        }
    }

    const accordionContent = [
        {
            title: 'Filter',
            content: <EventListFilter submitFilterHandler={submitFilterHandler} resetFilter={resetFilter}/>,
        }
    ];

    return (
        <>
            {props.events.activeModal
                ? <EventModal activeModal={props.events.activeModal} event={props.events.modalEvent} updateState={updateState}/>
                : null
            }
            <div className='main-wrapper narrow'>
                <Accordion content={accordionContent}/>
                <h1>Veranstaltungen</h1>
                {
                    props.currentUser.authorized
                    ? props.currentUser.userData.is_member || props.currentUser.userData.is_crew
                        ? <NavLink to='/event-erstellen' className='btn primary create-event'>Event erstellen</NavLink>
                        : null
                    : null
                }
            </div>
            {loading ?
                <Loading /> : <EventsContainer data={data}/>
            }
            {
                props.currentUser.authorized
                    ? props.currentUser.userData.is_member || props.currentUser.userData.is_crew
                    ? <div className='main-wrapper narrow'><NavLink to='/event-erstellen' className='btn primary create-event'>Event erstellen</NavLink></div>
                        : null
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


/*
*         const user_id = props.currentUser.userData.id
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
* */