import React, {useEffect, useState} from 'react';

export default function UserSearchForm(props) {
    return (
        <form className='search-user-from' onSubmit={ e => props.onSubmitHandler(e)}>
            <input id='search-user-input' onChange={ e => props.onChangeHandler(e)}/>
            <button type='submit' className='btn'>Suchen</button>
            <p id='search-form-error' className='error'></p>
        </form>
    );
};
