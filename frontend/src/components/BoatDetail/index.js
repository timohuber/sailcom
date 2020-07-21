import React, {useEffect, useState} from 'react';
import Axios from '../../axios';
import {connect, useDispatch} from "react-redux";
import BoatDetailContainer from './BoatDetailContainer'
import Loading from '../GenericLoading'
import {addBoatAction} from '../../store/actions/boatActions'

function BoatDetails(props) {
    const dispatch = useDispatch()
    const [boat, setBoat] = useState({});
    const [loading, setLoading] = useState(true);
    const boatID = props.match.params.id

    useEffect(() => {
        if (boatID in props.boatlist) {
            setLoading(false)
        } else {
            const fetchData = async() => {
                try {
                    const response = await Axios.get(`boat/${boatID}/`);
                    dispatch(addBoatAction(response.data))
                } catch (error) {
                    console.log('an error occurred', error);
                }
            }
            fetchData()
        }
    }, [props.currentUser, props.boatlist])

    return (
        <>
        {loading ?
            <Loading /> :
            <BoatDetailContainer boat={props.boatlist[boatID]} user={props.currentUser.userData}/>
        }
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        boatlist: state.boats.boatlist
    }
}
const connection = connect(mapStateToProps);
const ConnectedBoatDetails = connection(BoatDetails);

export default ConnectedBoatDetails;


/*

useEffect(() => {
        const config = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        }
        const response = fetch(baseUrl + 'boat/'+ boatID + '/', config)
        .then(res => res.json())
        .then(data => {
            dispatch(addBoatAction(data))
            setBoat(data);
            setLoading(false)
        })
        .catch(response => {
            return
        })
    }, [props.currentUser])


*/