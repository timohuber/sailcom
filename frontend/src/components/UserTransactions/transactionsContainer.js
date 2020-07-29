import React from 'react';
import Transaction from './transaction';

export default function TransactionsContainer(props) {
    return (
        <div className='transaction-container'>
            <h1>Ihre Transaktionen</h1>
            <article className='transaction-list-element header'>
                <div className='amount'>Betrag</div>
                <div className='boat'>Boot</div>
                <div className='date'>Datum</div>
                <div className='status'>Status</div>
            </article>
            <div className='transaction-list-element-wrapper'>
                {props.transactions.map((transaction) => {
                    return <Transaction transaction={transaction} />;
                })}
            </div>
        </div>
    );
}
