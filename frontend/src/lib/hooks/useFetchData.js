import React, {useState, useEffect} from 'react';
import {baseUrl} from "../../src/store/constants";

export function useFetchData(url, config = null) {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(baseUrl + url, config)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setLoading(false);
                setResult(data)
            }).catch(e => {
            setError(e)
        });
    }, [])

    return {
        result,
        loading,
        error
    }
}