import React from 'react';

export default function Components(props) {
    return (
        <>
            <h1>Components</h1>
            <div className='components-wrapper'>
                <div>
                    <p>
                        <stong>Buttons</stong>
                    </p>
                    <button className='btn'>Submit</button>
                </div>
                <div>
                    <p>
                        <strong>Einspaltiges Formular</strong>
                    </p>
                    <form className='col-1'>
                        <div className='input-container'>
                            <div className='input-wrapper'>
                                <label htmlFor='first-name'>Vorname</label>
                                <input id='first-name' name='first_name' />
                                <span className='error'>
                                    Dieses Feld wird benötigt.
                                </span>
                            </div>
                        </div>
                        <div className='button-container'>
                            <button className='btn'>Submit</button>
                        </div>
                    </form>
                </div>
                <div>
                    <p>
                        <strong>Mehrspaltiges Formular</strong>
                    </p>
                    <form className='col-2'>
                        <div className='input-container'>
                            <div className='input-wrapper'>
                                <label htmlFor='first-name'>Vorname</label>
                                <input id='first-name' name='first_name' />
                                <span className='error'>
                                    Dieses Feld wird benötigt.
                                </span>
                            </div>
                            <div className='input-wrapper'>
                                <label htmlFor='last-name'>Nachname</label>
                                <input id='last-name' name='last_name' />
                                <span className='error'>
                                    Dieses Feld wird benötigt.
                                </span>
                            </div>
                            <div className='input-wrapper'>
                                <label htmlFor='street'>Strasse</label>
                                <input id='street' name='street' />
                                <span className='error'>
                                    Dieses Feld wird benötigt.
                                </span>
                            </div>
                            <div className='input-wrapper'>
                                <label htmlFor='zip'>Postleitzahl</label>
                                <input id='zip' name='zip' />
                                <span className='error'>
                                    Dieses Feld wird benötigt.
                                </span>
                            </div>
                        </div>
                        <div className='button-container'>
                            <button className='btn primary'>Primary</button>
                        </div>
                    </form>
                </div>
                <div>
                    <p>
                        <strong>Titles</strong>
                    </p>
                    <h1>Boat sharing</h1>
                    <h2>Boat sharing</h2>
                    <h3>Boat sharing</h3>
                    <h4>Boat sharing</h4>
                </div>
            </div>
        </>
    );
}
