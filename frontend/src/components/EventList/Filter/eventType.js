import React, {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import Loading from '../../GenericLoading';
import {getEventTypesAction} from '../../../store/actions/miscActions'

function EventTypesSelect(props) {
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
            <label htmlFor='category' className='required' >Kategorie</label>
             {
                 loading
                 ? <Loading />
                 :
                    <select
                        id='category'
                        name='category'
                        onChange={(e) => props.onChangeHandler(e) }
                    >
                        <option value='' selected disabled hidden>
                            Bitte wählen
                        </option>
                        {
                            data.map((type, i) => {
                                return (
                                    <option key={type.id} value={type.id}>
                                        {type.title}
                                    </option>
                                );
                            })
                        }
                    </select>
                 }
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
const ConnectedEventTypesSelect = connection(EventTypesSelect);

export default ConnectedEventTypesSelect;
