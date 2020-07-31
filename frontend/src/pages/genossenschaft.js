import React from 'react';
import { Link } from 'react-router-dom';

import Carmen from '../assets/carmen-somm.jpg';
import Markus from '../assets/markus-hartmeier.jpg';
import Uwe from '../assets/uwe-bechmann.jpg';

const carmenStyle = {
    backgroundImage: `url(${Carmen})`,
};

const markusStyle = {
    backgroundImage: `url(${Markus})`,
};

const uweStyle = {
    backgroundImage: `url(${Uwe})`,
};

export default function Genossenschaft(props) {
    return (
        <div className='main-wrapper genossenschaft'>
            <h1>Genossenschaft</h1>
            <div className='article-wrapper'>
                <article>
                    Gemeinsam besitzen, günstiger nutzen, in der SailCom
                    Genossenschaft möglich. Die SailCom Genossenschaft wurde
                    1998 gegründet, nachdem erste Boote bereits seit 1991
                    innerhalb der Auto-Sharing Organisation Mobility (ehemals
                    ShareCom) geteilt wurden. Sie hat um die 2500 Mitglieder und
                    bietet rund
                    <Link to='/boote/flotte'>
                        60 Boote in der ganzen Schweiz
                    </Link>
                    an. SailCom schreibt die Community gross. Wer will kann an
                    Segelevents teilnehmen, aber auch gemeinsam mit anderen
                    SailCom-Mitgliedern sich am Bootsunterhalt beteiligen. Das
                    macht nicht nur Spass, sondern ehrenamtliche Mithilfe
                    verhilft Dir zu günstigeren Segeltarifen. Dank deiner
                    Mithilfe nimmst Du Einfluss auf die Ausgestaltung der
                    SailCom. Schaue dir hierzu auch unser Leitbild und unsere
                    Statuten an.
                </article>
            </div>
            <div className='grid-col-3 staff-wrapper'>
                <div className='single-staff generic-box'>
                    <div
                        className='staff-photo-container'
                        style={carmenStyle}
                    ></div>
                    <div className='staff-details'>
                        <div className='staff-title'>
                            <h4>Carmen Sommer,</h4>
                            <h4 className='margin-bottom-15'>
                                Generalsekretärin
                            </h4>
                            <a
                                className='icon-phone margin-bottom-5'
                                href='tel:0443226626'
                            >
                                Tel. 044 322 66 26
                            </a>
                            <a
                                className='icon-email margin-bottom-15'
                                href='mailto:info@sailcom.ch'
                            >
                                info@sailcom.ch
                            </a>
                        </div>

                        <p>
                            Carmen führt die Geschäftsstelle und ist für den
                            gesamten operativen Betrieb verantwortlich. Sie ist
                            Ansprechpartnerin für alle Partnerorganisationen der
                            SailCom und für das Marketing verantwortlich.
                        </p>
                    </div>
                </div>
                <div className='single-staff generic-box'>
                    <div
                        className='staff-photo-container'
                        style={markusStyle}
                    ></div>
                    <div className='staff-details'>
                        <div className='staff-title'>
                            <h4>Markus Hartmeier,</h4>
                            <h4 className='margin-bottom-15'>
                                Leiter Administration
                            </h4>
                            <a
                                className='icon-phone margin-bottom-5'
                                href='tel:0443226626'
                            >
                                Tel. 044 322 66 26
                            </a>
                            <a
                                className='icon-email margin-bottom-15'
                                href='mailto:info@sailcom.ch'
                            >
                                info@sailcom.ch
                            </a>
                        </div>

                        <p>
                            Markus ist primärer Ansprechpartner für
                            Interessenten und Mitglieder, und kümmert sich um
                            alle administrativen Fragen und Abläufe,
                            insbesondere zu Mitgliedschaften, Rechnungen und
                            Reservationen.
                        </p>
                    </div>
                </div>
                <div className='single-staff generic-box'>
                    <div
                        className='staff-photo-container'
                        style={uweStyle}
                    ></div>
                    <div className='staff-details'>
                        <div className='staff-title'>
                            <h4>Uwe Bechmann,</h4>
                            <h4 className='margin-bottom-15'>Leiter Flotte</h4>
                            <a
                                className='icon-phone margin-bottom-5'
                                href='tel:0443226626'
                            >
                                Tel. 044 322 66 24
                            </a>

                            <a
                                className='icon-email margin-bottom-15'
                                href='mailto:info@sailcom.ch'
                            >
                                info@sailcom.ch
                            </a>
                        </div>

                        <p>
                            Uwe unterstützt die Bootsteams beim Unterhalt der
                            Schiffe und technischen Fragen. Er ist
                            verantwortlich für eine gut ausgerüstete und sichere
                            Flotte. Nutzer wenden sich in erster Linie jedoch an
                            die Bootsteams, bei Notfällen ist die
                            Geschäftsstelle jedoch unter untenstehender
                            Notfallnummer erreichbar.
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <p>
                    Notfallnummer bei technischen Notfällen (z.B. Schäden am
                    Schiff wenn das Bootsteam nicht erreicht werden kann):
                    <a className='emergency' href='tel:0443226628'>
                        044 322 66 28
                    </a>
                </p>
            </div>
        </div>
    );
}
