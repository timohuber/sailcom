import React, {useEffect, useState} from "react";
import {baseUrl} from "../../../store/constants";
import Loading from '../../GenericLoading'


export default function SelectLake(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const config = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        }
        const response = fetch(baseUrl + 'lakes/')
        .then(res => res.json())
        .then(data => {
            setData(data);
            setLoading(false)
        })
        .catch(response => {
            return
        })
    }, [])

    return (
        <div className='input-wrapper'>
            {loading
                ? <Loading/>
                : <>
                    <label htmlFor='event_type'>See</label>
                    <select
                        id='lake'
                        name='lake'
                        onChange={ e => props.onChangeHandler(e) }
                    >
                        <option value=''>
                            Bitte wählen
                        </option>

                        {data.map((lake, i) => {
                            return (
                                <option key={i} value={lake.id}>
                                    {lake.title}
                                </option>
                            );
                        })}
                    </select>
                </>}
        </div>
    )
}
