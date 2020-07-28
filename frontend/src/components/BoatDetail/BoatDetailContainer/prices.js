import React from "react";

export const PricesTable = (props) => {
    const boat = props.boat;
    return (
         <table className='boat-prices simple'>
                <thead>
                    <tr>
                        <td>
                            Grundtarif
                        </td>
                        <td>

                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Pro Stunde
                        </td>
                        <td>
                            CHF {boat.price_hour_weekday}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Pro Tag
                        </td>
                        <td>
                           CHF {boat.price_fullday_weekday}
                        </td>
                    </tr>
                </tbody>
            </table>
    );
}
