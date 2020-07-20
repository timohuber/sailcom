import React, {useEffect, useState} from "react";
import {baseUrl} from "../../../store/constants";
import Loading from '../../GenericLoading'

export default function SelectCategory(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const config = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        }
        const response = fetch(baseUrl + 'boat/category/')
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
                    <label htmlFor='event_type'>Kategorie</label>
                    <select
                        id='category'
                        name='category'
                        onChange={ e => props.onChangeHandler(e) }
                    >
                        <option value=''>
                            Bitte wählen
                        </option>

                        {data.map((item, i) => {
                            return (
                                <option key={i} value={item.id}>
                                    {item.category_name}
                                </option>
                            );
                        })}
                    </select>
                </>}
        </div>
    )
}
