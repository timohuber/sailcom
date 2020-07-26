import React, { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';

import Loading from '../../components/GenericLoading';
import { whereIsCurrentUserCrewMemberAction } from '../../store/actions/eventActions';

function WhereCrewMemberForm(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.whereCrew) {
        } else {
            dispatch(whereIsCurrentUserCrewMemberAction());
        }
    }, []);

    const formHandler = () => {
        return (
            <div className='input-wrapper'>
                <label htmlFor='boat' className='required'>Boot auswählen</label>
                <select
                    id='boat'
                    name='boat'
                    onChange={(e) => props.onChangeHandler(e)}
                    className='required'
                    value={props.boat}
                >
                    <option value='' selected disabled hidden>
                        Bitte wählen
                    </option>
                    {props.whereCrew.map((boat, i) => {
                        return (
                            <option key={i} value={boat.id}>
                                {boat.title}
                            </option>
                        );
                    })}
                </select>
                <span id='select-error' className='error' data-key='boat'></span>
            </div>
        );
    };

    if (props.currentUser.authorized && props.currentUser.userData.is_crew) {
        return props.whereCrew ? formHandler() : <Loading />;
    }
    else {
        return (
            <div className='input-wrapper'>
                <label htmlFor='boat'>Boot auswählen</label>
                <p className='error'>Keine Boote</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        whereCrew: state.events.whereCrew,
        currentUser: state.currentUser
    };
};

const connection = connect(mapStateToProps);
const ConnectedWhereCrewMemberForm = connection(WhereCrewMemberForm);

export default ConnectedWhereCrewMemberForm;
