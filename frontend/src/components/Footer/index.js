import React from 'react';
import { Link } from 'react-router-dom';

// import Logo from '../assets/logo/logo.png';
// import Map from '../assets/swiss-map.jpg';
// import Community from '../assets/community.png';

export default function Footer(props) {
    return (
        <div className='footer-wrapper'>
            <div className='main-wrapper'>
                <div className='grid-col-5'>
                    <div>
                        <h3>Kontakt</h3>
                        <ul>
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
                                <a className='icon-email' href='mailto:info@sailcom.ch'>
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
                                <Link>Mitglied werden Kosten</Link>
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
            </div>
        </div>
    );
}
