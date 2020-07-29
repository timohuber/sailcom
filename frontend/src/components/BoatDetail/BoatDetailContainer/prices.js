import React from 'react';

export const PricesTable = (props) => {
    const boat = props.boat;
    return (
        <table className='boat-prices simple'>
            <thead>
                <tr>
                    <td>Grundtarif</td>
                    <td>Wochentag</td>
                    <td>Wochenende</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Stunde</td>
                    <td>CHF {boat.price_hour_weekday}</td>
                    <td>CHF {boat.price_hour_weekend}</td>
                </tr>
                <tr>
                    <td>Tag</td>
                    <td>CHF {boat.price_fullday_weekday}</td>
                    <td>CHF {boat.price_fullday_weekend}</td>
                </tr>
            </tbody>
        </table>
    );
};
