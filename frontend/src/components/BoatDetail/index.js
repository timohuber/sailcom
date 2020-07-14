import React, {useEffect, useState} from 'react';
import {baseUrl} from "../../store/constants";
import {connect} from "react-redux";
import BoatDetailContainer from './BoatDetailContainer'
import Loading from '../GenericLoading'

function BoatDetails(props) {
    const [boat, setBoat] = useState({});
    const [loading, setLoading] = useState(true);
    const boatID = props.match.params.id

    useEffect(() => {
        const config = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.currentUser.accessToken}`
            })
        }
        const response = fetch(baseUrl + 'boat/'+ boatID + '/', config)
        .then(res => res.json())
        .then(data => {
            setBoat(data);
            setLoading(false)
        })
        .catch(response => {
            return
        })
    }, [props.currentUser])

    return (
        <>
        {loading ? <Loading /> : <BoatDetailContainer boat={boat}/>}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser    }
}
const connection = connect(mapStateToProps);
const ConnectedBoatDetails = connection(BoatDetails);

export default ConnectedBoatDetails;
