import React, {useEffect, useState} from 'react';
import {baseUrl} from "../../store/constants";
import BoatsContainer from "./boatscontainer";
import BoatListFilter from "./Filter";
import Loading from '../GenericLoading'
import Accordion from "../Accordion";
import {dateToISOString} from "../../lib/helpers/formatDates";
import Axios from "../../axios";
import {formErrorHandler} from "../../lib/helpers/errorHandler";
import {getBoatOverview} from "../../store/actions/boatActions";

export default function BoatListContainer(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibilityFilter, setVisibilityFilter] = useState()

    useEffect(() => {
        const fetchBoats = async () => {
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
                console.log(error.response.data)
            }
       }
       fetchBoats()
    }, [visibilityFilter])

    const submitFilterHandler = (e, filterQuery) => {
        e.preventDefault()

        let count = 0
        let query = '?'
        for (const [key, value] of Object.entries(filterQuery)) {
            if(value) {
                if(key === 'from_date_time' || key === 'until_date_time') {
                    const formatted_date = dateToISOString(value)
                    console.log('is date', formatted_date)
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
