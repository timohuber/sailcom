import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { getAllBoatInfoAction } from '../store/actions/boatActions';

import Logo from '../assets/logo/logo.png';
import Map from '../assets/swiss-map.jpg';
import Maps from '../components/Map';
import Loading from '../components/GenericLoading';
import Boat from '../assets/home-sailboat.svg';
import Community from '../assets/home-community.svg';
import Switzerland from '../assets/home-switzerland.svg';
import { smoothScroll } from '../lib/helpers/scroll';

function HomePage(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBoatInfoAction());
    }, []);

    const pageHandler = () => {
        return (
            <>
                <div className='main-wrapper'>
                    <h1>
                        Faszination Segeln - einfacher, günstiger, ökologischer
                        und abwechslungsreicher!
                    </h1>
                    <div className='grid-col-3 generic-box-grid'>
                        <div className='home-icon-box'>
                            <div className='upper-wrapper'>
                                <img id='home-boat-icon' src={Boat}></img>
                                <h2 className='h2-underlined'>Boat Sharing</h2>
                                <p>
                                    Als SailCom-Mitglied verfügst du über eine
                                    ganze Flotte und kannst auf fast allen
                                    Schweizer Seen segeln. Schnell online
                                    reservieren und schon kannst du lossegeln.
                                </p>
                            </div>

                            <Link to='/boat-sharing'>
                                <button className='btn primary'>
                                    Mehr Infos
                                </button>
                            </Link>
                        </div>
                        <div className='home-icon-box'>
                            <div className='upper-wrapper'>
                                <img
                                    id='home-community-icon'
                                    src={Community}
                                ></img>
                                <h2 className='h2-underlined'>Community</h2>
                                <p>
                                    SailCom ist mehr als eine
                                    Eignergemeinschaft: Bei SailCom kannst Du
                                    mit andern segeln, an Events teilnehmen,
                                    Kurse besuchen, an Regatten teilnehmen und
                                    natürlich auch ganz alleine segeln.
                                </p>
                            </div>

                            <Link to='/events'>
                                <button className='btn primary'>
                                    Events Anschauen
                                </button>
                            </Link>
                        </div>
                        <div className='home-icon-box'>
                            <div className='upper-wrapper'>
                                <img
                                    id='home-switzerland-icon'
                                    src={Switzerland}
                                ></img>
                                <h2
                                    id='home-boat-icon-box-title'
                                    className='h2-underlined'
                                >
                                    Flexibilität
                                </h2>
                                <p>
                                    Bei SailCom bist du frei, du kannst nach
                                    Lust, Laune oder wo du gerade die perfekte
                                    Bö entdeckst, dein Boot schnappen und
                                    segeln. Geniesse die unterschiedlichen
                                    Landschaften und Winde der Schweizer Seen.
                                </p>
                            </div>
                            <Link to='/'>
                                <button
                                    className='btn primary'
                                    // onClick={smoothScroll('#google-map-home')}
                                >
                                    Miet Locations
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div id='google-map-home' className='map-home-wrapper'>
                    <Maps boatInfo={props.boatInfo} />
                </div>
                <div className='main-wrapper'>
                    <div className='grid-col-3 generic-box-grid'>
                        <div>
                            <h2>Finde das passende Boot</h2>
                            <hr />
                            <p>
                                Die SailCom Flotte umfasst ca. 60 Boote. Ob für
                                sportliches Regattasegln, gemütliche
                                Famillienausflüge, Feierabend-Kurztörns bei
                                Sonnenuntergang, mehrtägige Ferientörns – bei
                                SailCom findest du das passende Boot. Finde mehr
                                heraus und{' '}
                                <Link to='/boote/flotte'>
                                    schau dir unsere Flotte{' '}
                                </Link>
                                an.
                            </p>
                            <Link to='/boote'>
                                <button className='btn primary'>
                                    Boote Anschauen
                                </button>
                            </Link>
                        </div>
                        <div className='col-2'>
                            <h2>Werde Mitglied</h2>
                            <hr />
                            <p>
                                <span>Du hast schon einen D-Schein:</span>
                                <br />
                                Werde <Link to='/registrierung'>
                                    Mitglied
                                </Link>{' '}
                                im Boatsharing und profitiere von einem
                                günstigen Zugang zu
                                <Link to='/boote/flotte'> Booten</Link> & der{' '}
                                <Link to='/community'>Community</Link>.<br />
                                <span>Du hast (noch) keinen D-Schein:</span>
                                <br />
                                Lerne Segeln mit einer unserer{' '}
                                <Link to='/partner'>
                                    Partner-Segelschulen
                                </Link>{' '}
                                und profitiere von vergünstigten Kurspreisen im
                                Kombiangebot bei einer Mitgliedschaft SailCom +
                                Segelkurs.
                                <br />
                                <span>
                                    Möchtest du einfach einmal das Segeln
                                    beschnuppern?
                                </span>
                                <br />
                                Dann erstelle gratis einen{' '}
                                <Link to='/registrierung'>Account</Link> und
                                nimm an unseren öffentlichen
                                <Link to='/community/events'>
                                    {' '}
                                    Segel-Events
                                </Link>{' '}
                                teil.
                            </p>

                            <div className='button-container'>
                                <Link to='/registrierung'>
                                    <button className='btn primary'>
                                        Mitglied werden
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return props.boatInfo ? pageHandler() : <Loading />;
}

const mapStateToProps = (state) => {
    return {
        boatInfo: state.boatInfo.boatInfo,
    };
};

const connection = connect(mapStateToProps);
const ConnectedHomePage = connection(HomePage);

export default ConnectedHomePage;
