import React, {useEffect, useState} from 'react';
import {baseUrl} from "../../store/constants";
import BoatsContainer from "./boatscontainer";
import BoatListFilter from "./Filter";
import Loading from '../GenericLoading'
import Accordion from "../Accordion";

export default function BoatListContainer(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibilityFilter, setVisibilityFilter] = useState()

    useEffect(() => {
        let url = 'boat/'

        const config = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        }

        const response = fetch(baseUrl + url, config)
        .then(res => res.json())
        .then(data => {
            setData(data['results']);
            setLoading(false)
        })
        .catch(response => {
            return
        })
    }, [visibilityFilter])

    const submitFilterHandler = (e, filterQuery) => {
        e.preventDefault()
        setVisibilityFilter(filterQuery)

        /*
        const config = {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }),
            body: JSON.stringify({
                visibilityFilter
            })
        }

        const response = fetch(baseUrl + 'boat/search/', config)
        .then(res => res.json())
        .then(data => {
            console.log('data')
            setData(data['results']);
            setLoading(false)
        })
        .catch(response => {
            return
        })
        */
    }

    const accordionContent = [
        {
            title: 'Filter',
            content: <BoatListFilter submitFilterHandler={submitFilterHandler}/>,
        }
    ];

    return (
        <>
        <div className='main-wrapper'>
             <Accordion content={accordionContent}/>
        </div>
        {loading ? <Loading /> : <BoatsContainer data={data}/>}
        </>
    );
};
