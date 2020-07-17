import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import TransactionsContainer from './transactionsContainer'
import Loading from '../GenericLoading';
import {baseUrl} from "../../store/constants";

function UserTransactions(props) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const config = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            })
        }
        const response = fetch(baseUrl + 'transaction/', config)
        .then(res => res.json())
        .then(data => {
            setData(data['results']);
            setLoading(false)
        })
        .catch(res => {
            return res
        })
    }, [])

    return (
        <>
            {loading
            ? <Loading />
            : <TransactionsContainer transactions={data}/>
            }
        </>
    );
};


const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}
const connection = connect(mapStateToProps);
const ConnectedUserTransactions = connection(UserTransactions);

export default ConnectedUserTransactions;