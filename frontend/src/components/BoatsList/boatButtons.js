import React from 'react';
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom';

function ListButtonsContainer(props) {
    let instructed = false
    const user = props.user
    const boat = props.boat

    if (user.authorized) {
        instructed = user.userData.instructed_for_models.includes(props.boat.model.id)
    }

    return (
        <div className='boat-button-container'>
            <NavLink
                 to={`/boot/${boat.id}`}
                 className={`btn ${
                     instructed
                     ? 'primary'
                     : 'disabled'    
                 }`}
            >
                {
                    instructed
                    ? 'Reservieren'
                    : 'Nicht qualifiziert'
                }
            </NavLink>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        user: state.currentUser    }
}
const connection = connect(mapStateToProps);
const ConnectedListButtonsContainer = connection(ListButtonsContainer);

export default ConnectedListButtonsContainer;