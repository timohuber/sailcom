import React, { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import Loading from '../../components/GenericLoading';
import {
    whereIsCurrentUserCrewMemberAction,
    createEventAction,
} from '../../store/actions/eventActions';

function WhereCrewMemberForm(props) {
    const dispatch = useDispatch();
    let requiredFieldsOK = true;
    const initialState = {};

    const [value, setValue] = useState(initialState);

    useEffect(() => {
        if (props.whereCrew) {
        } else {
            dispatch(whereIsCurrentUserCrewMemberAction());
        }
    }, []);

    const onChangeHandler = (e) => {
        setValue({
            boat: e.currentTarget.selectedOptions[0].getAttribute('id'),
        });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const requiredFields = document.querySelectorAll('.required');

        requiredFields.forEach((field) => {
            if (!field.value) {
                field.nextElementSibling.style.opacity = '1';
                requiredFieldsOK = false;
            } else {
                field.nextElementSibling.style.opacity = '0';
            }
        });

        if (requiredFieldsOK) {
            dispatch(createEventAction(value));
        }
    };

    const formHandler = () => {
        return (
            <div className='input-wrapper'>
                <label htmlFor='boat'>Boat</label>
                <select
                    id='boat'
                    name='boat'
                    onChange={(e) => props.onChangeHandler(e)}
                    className='required'
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
                <span className='error'>Dieses Feld wird benötigt.</span>
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
