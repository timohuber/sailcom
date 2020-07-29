import React, {useEffect, useState} from 'react';
import Loading from '../GenericLoading'
import UserSearchForm from "./searchForm";
import UsersContainer from './usersContainer'
import {baseUrl, authenticatedGetConfig} from "../../store/constants";
import Axios from "../../axios";


export default function UserSearch(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('')

    const onChangeHandler = e => {
        setSearchQuery(e.currentTarget.value)
    }

    const onSubmitHandler = async e => {
        e.preventDefault()
        if (searchQuery) {
            try {
                document.getElementById('search-form-error').innerText = ''
                setLoading(true)
                const response = await Axios.get(baseUrl + `user/?search=${searchQuery}`)
                setData(response.data['results'])
                setLoading(false)
                console.log(response.data['results'])
            } catch (error) {
            if(error) {
                console.log('an error occurred', error)
                }
            }
        } else {
            document.getElementById('search-form-error').innerText = 'Bitte Suchbegriff eingeben'
        }
    }

    const openMembershipRequestsHandler = async e => {
        e.preventDefault()
        try {
            const response = await Axios.get('user/openMembershipRequest/');
            setData(response.data['results'])
            return response;
        } catch (error) {
            if(error) {
                console.log('an error occurred', error)
            }
        }

    }

    return (
        <div className='main-wrapper'>
            <h1>Mitglieder suchen</h1>
            <UserSearchForm onSubmitHandler={onSubmitHandler} onChangeHandler={onChangeHandler} toggleOpenRequests={openMembershipRequestsHandler}/>
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

