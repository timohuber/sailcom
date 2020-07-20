import React, {useEffect, useState} from 'react';
import Loading from '../GenericLoading'
import UserSearchForm from "./searchForm";
import UsersContainer from './usersContainer'
import {baseUrl, authenticatedGetConfig} from "../../store/constants";


export default function UserSearch(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('')

    const onChangeHandler = e => {
        setSearchQuery(e.currentTarget.value)
    }

    const onSubmitHandler = e => {
        e.preventDefault()
        if (searchQuery) {
            document.getElementById('search-form-error').innerText = ''
            setLoading(true)
            const response = fetch(baseUrl + `user/?search=${searchQuery}`, authenticatedGetConfig)
            .then(res => res.json())
            .then(data => {
                setData(data['results']);
                setLoading(false)
                console.log(data)
            })
            .catch(response => {
                return
            })
        } else {
            document.getElementById('search-form-error').innerText = 'Bitte Suchbegriff eingeben'
        }
    }

    return (
        <div className='main-wrapper'>
            <h1>Mitglieder suchen</h1>
            <UserSearchForm onSubmitHandler={onSubmitHandler} onChangeHandler={onChangeHandler}/>
            {
                !data
                ? null
                : loading
                ? <Loading />
                : <UsersContainer users={data}/>
            }
        </div>
    );
};
