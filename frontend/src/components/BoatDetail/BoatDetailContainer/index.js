import React from 'react';
import {NotQualifiedButton} from './buttons'

export default function BoatDetailContainer(props) {
    const boat = props.boat

    return (
        <div className='main-wrapper'>
            <h1>{boat.title}</h1>
            <table>
                <tbody>
                    <tr>
                        <td>

                        </td>
                        <td>

                        </td>
                    </tr>
                </tbody>
            </table>
        <div className='boat-button-container'>
            <NotQualifiedButton />
        </div>

        </div>
    );
};
