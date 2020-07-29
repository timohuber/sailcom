import React from 'react';
import { Link } from 'react-router-dom';

import GoogleMap from '../components/Map';
import Boat from '../assets/home-sailboat.svg';
import Community from '../assets/home-community.svg';
import Switzerland from '../assets/home-switzerland.svg';
import { smoothScroll } from '../lib/helpers/scroll';

// hero image
import HeroImage from '../components/HeroImage';
import BgImage from '../assets/sail-boat-sharing.jpg';
const heroContent = {
    title: 'Boat Sharing',
    subtitle:
        'Faszination Segeln - einfacher, günstiger, ökologischer und abwechslungsreicher!',
    buttontext: 'Boote anschauen',
    buttonlink: '/bootsliste',
    heroStyle: {
        backgroundImage: `url(${BgImage})`,
    },
};

function HomePage(props) {
    return (
        <>
            <HeroImage heroContent={heroContent} />
            <div className='main-wrapper'>
                <div className='grid-col-3 generic-box-grid'>
                    <div className='home-icon-box'>
                        <div className='upper-wrapper'>
                            <img id='home-boat-icon' src={Boat}></img>
                            <h2 className='h2-underlined'>Boat Sharing</h2>
                            <p>
                                Als SailCom-Mitglied verfügst du über eine ganze
                                Flotte und kannst auf fast allen Schweizer Seen
                                segeln. Schnell online reservieren und schon
                                kannst du lossegeln.
                            </p>
                        </div>

                        <Link to='/boat-sharing'>
                            <button className='btn primary'>Mehr Infos</button>
                        </Link>
                    </div>
                    <div className='home-icon-box'>
                        <div className='upper-wrapper'>
                            <img id='home-community-icon' src={Community}></img>
                            <h2 className='h2-underlined'>Community</h2>
                            <p>
                                SailCom ist mehr als eine Eignergemeinschaft:
                                Bei SailCom kannst Du mit andern segeln, an
                                Events teilnehmen, Kurse besuchen, an Regatten
                                teilnehmen und natürlich auch ganz alleine
                                segeln.
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
                                Bei SailCom bist du frei, du kannst nach Lust,
                                Laune oder wo du gerade die perfekte Bö
                                entdeckst, dein Boot schnappen und segeln.
                                Geniesse die unterschiedlichen Landschaften und
                                Winde der Schweizer Seen.
                            </p>
                        </div>
                        <Link to='/standorte'>
                            <button className='btn primary'>Standorte</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div id='google-map-home' className='map-home-wrapper'>
                <GoogleMap />
            </div>
            <div className='main-wrapper'>
                <div className='grid-col-3 generic-box-grid'>
                    <div className='home-find-boat'>
                        <div className='home-find-boat-text-content'>
                            <h2>Finde das passende Boot</h2>
                            <p>
                                Die SailCom Flotte umfasst ca. 60 Boote. Ob für
                                sportliches Regattasegln, gemütliche
                                Famillienausflüge, Feierabend-Kurztörns bei
                                Sonnenuntergang, mehrtägige Ferientörns – bei
                                SailCom findest du das passende Boot. Finde mehr
                                heraus und 
                                <Link to='/standorte'> schau dir unsere Standorte </Link>
                                an.
                            </p>
                        </div>
                        <Link to='/bootsliste'>
                            <button className='btn primary home-btn-margin'>
                                Boote Anschauen
                            </button>
                        </Link>
                    </div>
                    <div className='col-2 home-membership-section'>
                        <h2>Werde Mitglied</h2>
                        <p>
                            <p>Du hast schon einen D-Schein:</p>
                            Stell ein Mitgliederantrag im Boatsharing und
                            profitiere von einem günstigen Zugang zu Booten &
                            der Community.
                            <br />
                            <br />
                            <p>Du hast (noch) keinen D-Schein:</p>
                            Lerne Segeln mit einer unserer Partner-Segelschulen
                            und profitiere von vergünstigten Kurspreisen im
                            Kombiangebot bei einer Mitgliedschaft SailCom mit
                            Segelkurs.
                            <br />
                            <br />
                            <p>
                                Möchtest du einfach einmal das Segeln
                                beschnuppern?
                            </p>
                            Dann erstelle gratis einen
                            <Link to='/registrierung'> Account</Link> und nimm
                            an unseren öffentlichen
                            <Link to='/events'> Segel-Events </Link>
                            teil.
                        </p>

                        <div className='button-container'>
                            <Link to='/registrierung'>
                                <button className='btn primary home-btn-margin'>
                                    Mitglied werden
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;
