import React, {useEffect, useState} from "react";
import SelectLake from "./selectLake";
import EventTypesSelect from "./eventType";
import SelectBoat from "./selectBoat";
import {connect} from "react-redux";

function EventListFilter(props) {
    const [formState, setFormState] = useState({})

    const onChangeHandler = (e) => {
        const key = e.currentTarget.name;
        setFormState({
            ...formState,
            [key]: e.currentTarget.value,
        });
    };

    const onChangeDateHandler = (date, key) => {
        setFormState({
            ...formState,
            [key]: date,
        });
    };

    const onChangeCheckboxHandler = (e) => {
        const key = e.currentTarget.name;
        setFormState({
            ...formState,
            [key]: !formState[key],
        });
    };

    return (
            <div className='filter-container'>
                <h1>Boot finden</h1>
                <form className='filter-form col-2' onSubmit={ e => props.submitFilterHandler(e, formState) }>
                    <div className="input-container">
                        <SelectLake
                            onChangeHandler={onChangeHandler}/>
                        <EventTypesSelect
                            onChangeHandler={onChangeHandler} />
                        <SelectBoat
                            onChangeHandler={onChangeHandler} />
                    </div>
                    <button className='btn primary' type='submit' onClick={ e => props.submitFilterHandler(e, formState, 'panel-0', 'icon-0') }>Suchen</button>
                    <button className='btn secondary' onClick={ e => props.resetFilter(e, 'panel-0', 'icon-0') } >Filter zurücksetzen</button>
                </form>
            </div>
    );
};


const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser    }
}
const connection = connect(mapStateToProps);
const ConnectedEventListFilter = connection(EventListFilter);

export default ConnectedEventListFilter;