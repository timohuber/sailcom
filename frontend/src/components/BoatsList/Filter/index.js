import React, {useEffect, useState} from "react";
import SelectLake from "./selectLake";
import SelectCategory from "./selectCategory";
import PeriodPicker from "./periodPicker";
import {connect} from "react-redux";

function BoatListFilter(props) {
    const [formState, setFormState] = useState({})

    const onChangeHandler = (e) => {
        console.log(formState)
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
                        <SelectCategory
                            onChangeHandler={onChangeHandler} />
                        <PeriodPicker
                            onChangeDateHandler={onChangeDateHandler}
                            from={formState['from_date_time']}
                            until={formState['until_date_time']}
                        />
                        {
                            props.currentUser.authorized
                            ?
                                <div className='input-wrapper'>
                                    <div className='checkbox-wrapper'>
                                        <input
                                            type="checkbox"
                                            id="instructed"
                                            name="instructed"
                                            value="true"
                                            onChange={ e => onChangeCheckboxHandler(e)}
                                        />
                                        <label
                                            htmlFor="instructed"> Nur von mir eingesegelte Botte anzeigen
                                        </label>
                                    </div>
                                </div>
                            : null
                        }
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
const ConnectedBoatListFilter = connection(BoatListFilter);

export default ConnectedBoatListFilter;