import React, {useEffect, useState} from 'react';
import {baseUrl} from "../../store/constants";
import BoatsContainer from "./boatscontainer";
import BoatListFilter from "./Filter";
import Loading from '../GenericLoading'
import Accordion from "../Accordion";
import {dateToISOString} from "../../lib/helpers/formatDates";

export default function BoatListContainer(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibilityFilter, setVisibilityFilter] = useState()

    useEffect(() => {
        let url = 'boat/'

        if (visibilityFilter) {
            url += visibilityFilter
        }

        const config = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        }

        fetch(baseUrl + url, config)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setData(data['results']);
            setLoading(false)
        })
        .catch(response => {
            return
        })
    }, [visibilityFilter])

    const submitFilterHandler = (e, filterQuery) => {
        e.preventDefault()
        console.log(dateToISOString(filterQuery.from_date_time))
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
            setVisibilityFilter(null)
        }
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
