import React from 'react';

export default function BoatTechnicalData(props) {
    const boat = props.boat
    return (
        <div className='boat-technical-data'>
            <p><strong>Technische Details</strong></p>
            <table className='simple striped'>
                <tbody>
                    <tr>
                        <td>
                            Länge
                        </td>
                        <td>
                            {boat.length}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Breite
                        </td>
                        <td>
                            {boat.width}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Tiefe
                        </td>
                        <td>
                            {boat.draught}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Zugelassen für Personen
                        </td>
                        <td>
                            {boat.max_crew}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Empfohlene Personenanzahl
                        </td>
                        <td>
                            {boat.recommended_crew}
                        </td>
                    </tr>
                </tbody>
            </table>
          </div>
    );
};
