import React, {useEffect, useState} from 'react';

export default function UserSearchForm(props) {
    return (
        <form className='search-user-from' onSubmit={ e => props.onSubmitHandler(e)}>
            <div className='input-wrapper'>
                <input id='search-user-input' onChange={ e => props.onChangeHandler(e)}/>
            </div>
                <button className='btn secondary center' onClick={ e => props.toggleOpenRequests(e) }>Alle offenen Anträge anzeigen</button>
                <span id='search-form-error' className='error'></span>
                <button type='submit' className='btn primary'>Suchen</button>
        </form>
    );
};
