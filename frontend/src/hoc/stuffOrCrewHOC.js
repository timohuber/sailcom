import React, {useEffect} from 'react'
import {compose} from "redux";
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';

const staffOrCrewHOC = (WrappedComponent) => (props) => {
    const {push} = useHistory();
    let {state: {currentUser}} = props;

    useEffect(() => {
        if(!currentUser.accessToken) {
            push('/')
        } else if(!currentUser.userData.is_staff && !currentUser.userData.is_crew) {
            push('/')
        }
    }, [currentUser])

    return <WrappedComponent match={props.match}/>
}

const mapStateToProps = state => {
    return {
        state: state
    }
}

const connectedstaffOrCrewHOC = compose(
    connect(mapStateToProps), staffOrCrewHOC
);

export default connectedstaffOrCrewHOC
