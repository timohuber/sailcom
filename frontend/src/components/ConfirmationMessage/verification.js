import React from 'react';
import { Link } from 'react-router-dom';

export default function ConfirmationVerification(props) {
    return (
        <div className='main-wrapper'>
            <form>
                <h1>Erfolgreich verifiziert</h1>
                <p className='form-text-centered'>
                    Gratulation! Sie haben sich gerade verifiziert. Falls Sie
                    eine Mitgliedschaft beantragt haben, werden wir Sie in kürze
                    von uns höhren. Klicken Sie auf weiter um auf die Startseite
                    zu gehen.
                </p>
                <div id='confirmation-button' className='button-container'>
                    <Link to='/'>
                        <button className='btn primary'>Weiter</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}
