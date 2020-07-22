import React, {useEffect, useState} from "react";
import Loading from '../../GenericLoading'
import {connect, useDispatch} from "react-redux";
import {getBoatOverviewAction} from "../../../store/actions/boatActions";

function SelectBoat(props) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (props.boatOverview) {
            setLoading(false);
        } else {
            dispatch(getBoatOverviewAction());
        }
    }, [props.boatOverview]);

    return (
        <div className='input-wrapper'>
            {loading
                ? <Loading/>
                : <>
                    <label htmlFor='event_type'>Boot</label>
                    <select
                        id='boat'
                        name='boat'
                        onChange={ e => props.onChangeHandler(e) }
                    >
                        <option value=''>
                            Bitte wählen
                        </option>

                        {props.boatOverview.map((boat, i) => {
                            return (
                                <option key={i} value={boat.id}>
                                    {boat.title}
                                </option>
                            );
                        })}
                    </select>
                </>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        boatOverview: state.boats.boatOverview,
    };
};
const connection = connect(mapStateToProps);
const ConnectedSelectBoat = connection(SelectBoat);

export default ConnectedSelectBoat;

