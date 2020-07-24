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
                                <Link>Boat Sharing</Link>
                            </li>
                            <li>
                                <Link>Genossenschaft</Link>
                            </li>
                            <li>
                                <Link>Partner</Link>
                            </li>
                            <li>
                                <Link>Covid-19 Schutzkonzept</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3>Boote</h3>
                        <ul>
                            <li>
                                <Link>Flotte</Link>
                            </li>
                            <li>
                                <Link>Standorte</Link>
                            </li>
                            <li>
                                <Link>Bootsliste</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3>Community</h3>
                        <ul>
                            <li>
                                <Link>Information</Link>
                            </li>
                            <li>
                                <Link>Veranstaltungen</Link>
                            </li>
                            <li>
                                <Link>Sailing Ladies</Link>
                            </li>
                            <li>
                                <Link>Race Group</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3>Beitreten</h3>
                        <ul>
                            <li>
                                <Link>Mitglied werden</Link>
                            </li>
                            <li>
                                <Link>Voraussetzungen</Link>
                            </li>
                            <li>
                                <Link>Kosten</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='social-footer'>
                    <hr />
                    <ul>
                        <li>
                            <Link>
                                <i class='fab fa-facebook-f'></i>
                            </Link>
                        </li>
                        <li>
                            <Link>
                                <i class='fab fa-instagram'></i>
                            </Link>
                        </li>
                        <li>
                            <Link>
                                <i class='fab fa-pinterest-p'></i>
                            </Link>
                        </li>
                        <li>
                            <Link>
                                <i class='fab fa-youtube'></i>
                            </Link>
                        </li>
                    </ul>
                    <hr />
                </div>
            </div>
        </div>
    );
}
