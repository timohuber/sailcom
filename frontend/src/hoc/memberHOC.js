import React, {useEffect} from 'react'
import {compose} from "redux";
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';

const memberHOC = (WrappedComponent) => (props) => {
    const {push} = useHistory();
    let {state: {currentUser}} = props;

    useEffect(() => {
        if(!currentUser.authorized) {
            push('/')
        } else if (!currentUser.userData.is_member) {
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

const connectedMemberHOC = compose(
    connect(mapStateToProps), memberHOC
);

export default connectedMemberHOC
