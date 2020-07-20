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
                <label htmlFor='boat'>Boat</label>
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
                <span className='error' data-key='title'></span>
            </div>
        );
    };

    return props.whereCrew ? formHandler() : <Loading />;
}

const mapStateToProps = (state) => {
    return {
        whereCrew: state.events.whereCrew,
    };
};

const connection = connect(mapStateToProps);
const ConnectedWhereCrewMemberForm = connection(WhereCrewMemberForm);

export default ConnectedWhereCrewMemberForm;

// component can be added like this:
// <WhereCrewMemberForm
//     onChangeHandler={onChangeHandler}
//     boat={value.boat} // for selected value
// />
