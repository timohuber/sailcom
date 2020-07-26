import React, {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import Loading from '../GenericLoading';
import {getEventTypesAction} from '../../store/actions/miscActions'

function EventTypes(props) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const dispatch = useDispatch()

    useEffect( () => {
        if (!props.event_types) {
            dispatch(getEventTypesAction())
        } else {
            setData(props.event_types)
            setLoading(false)
        }
    }, [props.event_types])

    return (
         <div className='input-wrapper'>
            <label htmlFor='event_type' className='required' >Kategorie</label>
             {
                 loading
                 ? <Loading />
                 :
                    <select
                        id='event_type'
                        name='event_type'
                        onChange={(e) => props.onChangeTypeHandler(e) }
                    >
                        <option value='' selected disabled hidden>
                            Bitte wählen
                        </option>
                        {
                            props.user.is_crew
                            ?
                                data.map((type, i) => {
                                    return (
                                        <option key={type.id} value={type.id}>
                                            {type.title}
                                        </option>
                                    );
                                })

                            :
                                data.map((type, i) => {
                                    if (type.id == 1) {
                                        return null
                                    }
                                    return (
                                        <option key={type.id} value={type.id} selected={i === 0}>
                                            {type.title}
                                        </option>
                                    );
                                })
                        }
                    </select>
                 }
            <span id='type-error' className='error' data-key='event_type'/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        event_types: state.misc.event_types,
        user: state.currentUser.userData
    };
};

const connection = connect(mapStateToProps);
const ConnectedEventTypes = connection(EventTypes);

export default ConnectedEventTypes;
