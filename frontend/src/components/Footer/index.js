import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer(props) {
    return (
        <div id='footer' className='footer-wrapper'>
            <div className='main-wrapper'>
                <div className='grid-col-5'>
                    <div>
                        <h3>Kontakt</h3>
                        <ul>
                            <li>
                                <p>SailCom Genossenschaft</p>
                            </li>
                            <li>
                                <p>Frohburgstrasse 19</p>
                            </li>
                            <li>
                                <p>8006 Zürich</p>
                            </li>
                            <li>
                                <a className='icon-phone' href='tel:0443226626'>
                                    044 322 66 26
                                </a>
                            </li>
                            <li>
                                <a
                                    className='icon-email'
                                    href='mailto:info@sailcom.ch'
                                >
                                    info@sailcom.ch
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3>Sailcom</h3>
                        <ul>
                            <li>
                                <Link to='/boat-sharing'>Boat Sharing</Link>
                            </li>
                            <li>
                                <Link to='/genossenschaft'>Genossenschaft</Link>
                            </li>
                            <li>
                                <Link to='#'>Partner</Link>
                            </li>
                            <li>
                                <Link to='#'>Covid-19 Schutzkonzept</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3>Boote</h3>
                        <ul>
                            <li>
                                <Link to='/bootsliste'>Flotte</Link>
                            </li>
                            <li>
                                <Link to='#'>Standorte</Link>
                            </li>
                            <li>
                                <Link to='/bootsliste'>Bootsliste</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3>Community</h3>
                        <ul>
                            <li>
                                <Link to='#'>Information</Link>
                            </li>
                            <li>
                                <Link to='/events'>Veranstaltungen</Link>
                            </li>
                            <li>
                                <Link to='#'>Sailing Ladies</Link>
                            </li>
                            <li>
                                <Link to='#'>Race Group</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3>Beitreten</h3>
                        <ul>
                            <li>
                                <Link to='/registrierung'>Mitglied werden</Link>
                            </li>
                            <li>
                                <Link to='#'>Voraussetzungen</Link>
                            </li>
                            <li>
                                <Link to='#'>Kosten</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='social-footer'>
                    <hr className='hide-md' />
                    <ul>
                        <li>
                            <a target='_blank' href='https://www.facebook.com/'>
                                <i className='fab fa-facebook-f'></i>
                            </a>
                        </li>
                        <li>
                            <a
                                target='_blank'
                                href='https://www.instagram.com/'
                            >
                                <i className='fab fa-instagram'></i>
                            </a>
                        </li>
                        <li>
                            <a
                                target='_blank'
                                href='https://www.pinterest.com/'
                            >
                                <i className='fab fa-pinterest-p'></i>
                            </a>
                        </li>
                        <li>
                            <a target='_blank' href='https://www.youtube.com/'>
                                <i className='fab fa-youtube'></i>
                            </a>
                        </li>
                    </ul>
                    <hr className='hide-md' />
                </div>
            </div>
        </div>
    );
}
