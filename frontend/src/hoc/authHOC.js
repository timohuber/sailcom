import React, {useEffect} from 'react'
import {compose} from "redux";
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';

const authComponent = (WrappedComponent, redirectIfLoggedIn = false) => (props) => {
    const {push} = useHistory();
    let {state: { currentUser: {accessToken}}} = props;

    // useEffect(() => {
    //     if (!redirectIfLoggedIn) {
    //         if(!accessToken) push('/')
    //     }
    //     if (redirectIfLoggedIn) {
    //         if (accessToken) push('/')
    //     }
    // }, [accessToken])

    return <WrappedComponent match={props.match}/>
}

const mapStateToProps = state => {
    return {
        state: state
    }
}

const connectedAuthComponent = compose(
    connect(mapStateToProps), authComponent
);

export default connectedAuthComponent
