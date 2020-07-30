import React from 'react';

export default function GenericTextInput(props) {
    return (
        <div className='input-wrapper'>
            <label htmlFor={props.key} className='required'>
                {props.label}
            </label>
            <input
                id={props.data_key}
                name={props.data_key}
                onChange={(e) => props.onChangeHandler(e)}
                className={props.required ? 'required' : null}
                value={props.value}
            />
            <span className='error' data-key={props.data_key} />
        </div>
    );
}
