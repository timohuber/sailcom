import React, { Component } from 'react';

export default function BookingSummary(props) {
    return (
        <table className='simple'>
            <tbody>
                <tr>
                    <td>
                        Schiff:
                    </td>
                    <td>
                        {props.boat.title}
                    </td>
                </tr>
                <tr>
                    <td>
                        Von
                    </td>
                    <td>
                        {props.from}
                    </td>
                </tr>
                <tr>
                    <td>
                        Bis
                    </td>
                    <td>
                        {props.until}
                    </td>
                </tr>
                <tr className='total'>
                    <td>
                        Total
                    </td>
                    <td>
                        {props.calculatedPrice}
                    </td>
                </tr>
            </tbody>
        </table>
    );
};
