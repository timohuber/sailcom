import React, {useEffect, useState} from 'react';
import BoatsContainer from "./boatscontainer";
import BoatListFilter from "./Filter";
import Loading from '../GenericLoading'
import Accordion from "../Accordion";
import {dateToISOString} from "../../lib/helpers/formatDates";
import Axios from "../../axios";
import {toggleAccordionHandler} from "../../lib/helpers/filters";
import {smoothScroll} from '../../lib/helpers/scroll'

export default function BoatListContainer(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibilityFilter, setVisibilityFilter] = useState()

    useEffect(() => {
        const fetchBoats = async () => {
            setLoading(true)
            let url = 'boat/'
            if (visibilityFilter) {
                url += visibilityFilter
            }
            try {
                const response = await Axios.get(url);
                setData(response.data.results)
                setLoading(false)
                return response;
            } catch (error) {
                if (error.response) {
                    console.log('an error occurred', error)
                }
            }
       }
       fetchBoats()
    }, [visibilityFilter])

    const resetFilter = (e, panelID, iconID) => {
        e.preventDefault()
        toggleAccordionHandler(panelID, iconID)
        smoothScroll('.App')
        setVisibilityFilter(null)
    }

    const submitFilterHandler = (e, filterQuery, panelID, iconID) => {
        e.preventDefault()
        toggleAccordionHandler(panelID, iconID)
        smoothScroll('.App')

        let count = 0
        let query = '?'
        for (const [key, value] of Object.entries(filterQuery)) {
            if(value) {
                if(key === 'from_date_time' || key === 'until_date_time') {
                    const formatted_date = dateToISOString(value)
                    query += `${key}=${formatted_date}&`
                } else {
                    query += `${key}=${value}&`
                }
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
            content: <BoatListFilter submitFilterHandler={submitFilterHandler} resetFilter={resetFilter}/>,
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
