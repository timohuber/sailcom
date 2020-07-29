import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { whereIsCurrentUserCrewMemberAction } from '../../store/actions/eventActions';
import BoatFormElement from './boatFormElement';
import Loading from '../GenericLoading';
import { authenticatedPostConfig, baseUrl } from '../../store/constants';

function UserBoatsForm(props) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(props.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!props.whereCrew) {
            dispatch(whereIsCurrentUserCrewMemberAction());
        } else {
            setLoading(false);
        }
    });

    const toggleUserHandler = (modelID) => {
        const requestBody = {
            BoatModel: modelID,
            User: user.id,
        };
        const newInstructedArray = user.instructed_for_models;

        if (user.instructed_for_models.includes(modelID)) {
            newInstructedArray.splice(newInstructedArray.indexOf(modelID), 1);
        } else {
            newInstructedArray.push(modelID);
        }

        const response = fetch(
            baseUrl + 'user/toggleInstructed/',
            authenticatedPostConfig(requestBody)
        )
            .then((res) => {
                if (!res.ok) {
                    throw res;
                }
                setUser({
                    ...user,
                    instructed_for_models: newInstructedArray,
                });
                return res.json();
            })
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.log(error);
                return;
            });
    };

    return (
        <div className='user-boats'>
            <h2>Boote freischalten</h2>
            <div className='user-boats-form'>
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        {props.whereCrew.map((boat) => {
                            return (
                                <BoatFormElement
                                    boat={boat}
                                    user={user}
                                    toggleUserHandler={toggleUserHandler}
                                    key={boat.id}
                                />
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        whereCrew: state.events.whereCrew,
    };
};

const connection = connect(mapStateToProps);
const ConnectedUserBoatsForm = connection(UserBoatsForm);

export default ConnectedUserBoatsForm;
