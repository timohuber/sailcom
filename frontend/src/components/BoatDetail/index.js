import React, {useEffect, useState} from 'react';
import {baseUrl} from "../../store/constants";
import {connect} from "react-redux";
import Loading from '../GenericLoading'

function BoatDetails(props) {
    const [boat, setBoat] = useState({});
    const [loading, setLoading] = useState(true);
    const boatID = props.match.params.id


    useEffect(() => {
        const config = {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${props.currentUser.accessToken}`,
                'Content-Type': 'application/json',
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
    }, [])



    return (
        <h1>Chilli</h1>
    );
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser    }
}
const connection = connect(mapStateToProps);
const ConnectedBoatDetails = connection(BoatDetails);

export default ConnectedBoatDetails;
