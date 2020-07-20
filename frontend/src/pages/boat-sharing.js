import React from 'react';
import { Link } from 'react-router-dom';

export default function BoatSharing(props) {
    return (
        <div className='main-wrapper'>
            <h1>Boat Sharing</h1>
            <div className='grid-col-3'>
                <div>
                    <h2>Nutzen statt Besitzen</h2>
                    <hr />
                    <p>
                        Bei SailCom kannst Du Boote mit anderen teilen. Das ist
                        nicht nur kostensparend dank guter Auslastung der Boote,
                        sondern auch ökologisch: In den Häfen stauen sich
                        weniger unbenutzte Booten, es gibt weniger
                        Materialaufwand. SailCom bietet eine grosse Auswahl an{' '}
                        <Link to='/boote/flotte'>Booten </Link> und{' '}
                        <Link to='/boote/flotte'>Standplätzen </Link> für die
                        Mitglieder.
                    </p>
                </div>
                <div>
                    <h2>Segeln bei Selcom</h2>
                    <hr />
                    <p>
                        Segeln bei SailCom ist wesentlich einfacher als ein
                        eigenes Boot zu besitzen! Die Genossenschaft besorgt die{' '}
                        <Link to='/boote/flotte'>Flotte </Link>. Sie kümmert
                        sich um alles Notwendige wie Liegeplatz, Zulassung und
                        Versicherungen, usw. freiwillige Mitglieder helfen beim
                        Unterhalt mit, werden dafür mit Segelrabatt,
                        Community-Erlebnissen bei gemeinsamen Arbeiten und
                        zusätzlichem Knowhow belohnt.
                    </p>
                </div>
                <div>
                    <h2>Flexibilität</h2>
                    <hr />
                    <p>
                        Geniesse die Flexibilität! Entscheide spontan, nach Lust
                        und Laune, nach Wetterbedingungen oder folge einfach dem
                        Wind … Wechsle ab zwischen sportlichem Segeln,
                        gemütlichem Feierabendtörn oder einem erholsamen
                        Badetag!
                    </p>
                </div>
                <div>
                    <h2>Community</h2>
                    <hr />
                    <p>
                        Die SailCom <Link to='/community'>Community</Link>{' '}
                        vermittelt{' '}
                        <Link to='/community/mitsegelgelegenheiten'>
                            Mitsegelgelegenheiten{' '}
                        </Link>
                        , Segelwissen, <Link to='/community'>Events</Link> und
                        vieles mehr. Die Mitglieder buchen die Boote online und
                        bezahlen einen Alles-inklusive-Mietpreis pro Stunde oder
                        pro Tag. Eine Haftpflichtversicherung mit Selbstbehalt
                        ist in den Tarifen eingeschlossen. Die Boote gehören den
                        Genossenschaftsmitgliedern. Für die Finanzierung der
                        Flotte hält jedes Mitglied ein Genossenschaftskapital
                        und zur Deckung der fixen Administrationskosten bezahlen
                        alle einen Jahresbeitrag.
                    </p>
                </div>
                <div>
                    <h2>Werde Mitglied!</h2>
                    <hr />
                    <p>
                        Alle sind herzlich willkommen! Eröffne hier gratis
                        deinen SailCom-Account, du kannst danach entscheiden, ob
                        du Genossenschaftsmitglied werden möchtest. Schaue im
                        Beitreten-Bereich vorbei, dort findest du alles über die
                        verschiedenen Möglichkeiten, bei SailCom mitzusegeln"
                        und die Kosten. Viel Spass beim Segeln – Mast- und
                        Schotbruch!
                    </p>
                </div>
            </div>
        </div>
    );
}
