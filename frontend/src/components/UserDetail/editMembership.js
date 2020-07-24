import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import Loading from "../GenericLoading";
import {getMembershipTypes, getMembershipTypesAction} from '../../store/actions/miscActions'
import Axios from "../../axios";
import {membership_types} from "../../store/constants";

function UserEditMembership(props) {
    const[loading, setLoading] = useState(true)
    const[user, setUser] = useState(props.user)
    const[formState, setFormState] = useState({
        User: user.id
    })
    const dispatch = useDispatch()

    useEffect( () => {
        if(props.membership_categories) {
            setLoading(false)
        } else {
            dispatch(getMembershipTypesAction())
        }
    })

    const onChangeHandler = (e) => {
        const key = e.currentTarget.name;

        setFormState({
            ...formState,
            [key]: e.currentTarget.value,
        });
    };

    const onSubmitHandler = async e => {
        e.preventDefault()
        document.getElementById('membership-form-success').innerText = ''
        document.getElementById('membership-form-error').innerText = ''
        try {
            const response = await Axios.post('user/acceptMembershipRequest/', formState);
            setFormState({
                ...user,
                membership_type: formState.membership_state
            })
            document.getElementById('membership-form-success').innerText = 'Die Mitgliedschaft wurde erfolgreich angepasst'
        } catch (error) {
            if(error.response.data && error.response.status === 400) {
                document.getElementById('membership-form-error').innerText = error.response.data
            }
        }
    }

    return (
            <div className='user-edit-membership'>
                {
                    loading
                    ? <Loading />
                    :
                        <>
                            <h2>Mitgliederstatus</h2>
                            {
                                user.membership_type
                                ? <p>Mitgliedschaft: {user.membership_type}</p>
                                : user.request_membership
                                    ? <p className='success'>{user.first_name} {user.last_name} hat eine Mitgliedschaft beantragt</p>
                                    : <p className='error'>{user.first_name} {user.last_name} hat noch keine Mitgliedschaft beantragt</p>
                            }
                            <form onSubmit={ e => onSubmitHandler(e) }>
                                <p>Bitte wählen Sie den Mitgliederstatus</p>
                                <div className='input-wrapper'>
                                    <select name="membership_type" defaultValue={user.membership_type} onChange={ e => onChangeHandler(e) }>
                                        {
                                            user.membership_type
                                            ? null
                                            : <option disabled selected value>Bitte wählen</option>
                                        }
                                        {props.membership_categories.map( cat => {
                                            return <option value={cat.id}>{cat.title}</option>
                                        })}
                                    </select>
                                    <span className='error' id='membership-form-error' />
                                    <span className='form-success' id='membership-form-success' />
                                </div>
                                <button tpe='submit' className='btn primary'>Bestätigen</button>
                            </form>
                        </>
                }
            </div>
    );
};

const mapStateToProps = (state) => {
    return {
        membership_categories: state.misc.membership_categories,
    }
}
const connection = connect(mapStateToProps);
const ConnectedUserEditMembership = connection(UserEditMembership);

export default ConnectedUserEditMembership;