import React from 'react';
import {Link} from 'react-router-dom';

export default function ConfirmationMessage(props) {
    return (
        <div className='main-wrapper'>
            <h1>Bestätigung versendet</h1>
            <p>
                Wir haben Ihnen ein Email geschickt. Klicken Sie auf weiter und
                geben Sie den im Email enthaltene Code auf der nächste Seite
                ein.
            </p>
            <div id="confirmation-button" className='button-container'>
                <Link to='/verification'>
                    <button className='btn'>Weiter</button>
                </Link>
            </div>
        </div>
    );
}
