import React from 'react';

export default function UserSearchForm(props) {
    return (
        <form className='search-user-from' onSubmit={ e => props.onSubmitHandler(e)}>
            <div className='input-wrapper'>
                <input id='search-user-input' onChange={ e => props.onChangeHandler(e)}/>
            </div>
                <span id='search-form-error' className='error'></span>
                <button type='submit' className='btn primary'>Suchen</button>
                <button className='btn secondary center' onClick={ e => props.toggleOpenRequests(e) }>Alle offenen Mitgliedernträge anzeigen</button>
        </form>
    );
};
