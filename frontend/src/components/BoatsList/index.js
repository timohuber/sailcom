import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {baseUrl} from "../../store/constants";
import BoatsContainer from "./boatscontainer";
import BoatFilter from "./filter";
import Loading from '../GenericLoading'

import {getBoatData} from "./axios";

export default function BoatListContainer(props) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [visibilityFilter, setVisibilityFilter] = useState()

    useEffect(() => {
    const config = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
        })
    }
    const response = fetch(baseUrl + 'boat/')
    .then(res => res.json())
    .then(data => {
        setData(data['results']);
        setLoading(false)
    })
    .catch(response => {
        return
    })
}, [visibilityFilter])

    return (
        <>
        <BoatFilter />
        {loading ? <p>Loading</p> : <BoatsContainer data={data}/>}
        </>
    );
};
