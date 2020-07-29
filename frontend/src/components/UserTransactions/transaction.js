import React from 'react';
import {dateToDisplayStringWithoutTime} from '../../lib/helpers/formatDates'

export default function Transaction(props) {
    const transaction = props.transaction
    return (
        <article className='transaction-list-element'>
            <div className='amount'>
                {transaction.price}
                </div>
                <div className='boat'>
                    {
                        transaction.booking
                        ? transaction.booking.boat.title
                        : null
                    }
                </div>
                <div className='date'>
                    {dateToDisplayStringWithoutTime(transaction.created)}
                </div>
                <div className='status'>
                    {
                        transaction.sent
                        ? <i className="far fa-check-circle"></i>
                        : <i className="far fa-clock"></i>
                    }
                </div>
        </article>
    );
};
