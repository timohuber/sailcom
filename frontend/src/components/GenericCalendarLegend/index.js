import React from 'react';

export default function CalendarLegend() {
    return (
        <div className='calendar-legend'>
            <div>
                <div className='legend-element-wrapper'>
                    <div className='legend-color-field your-booking' />
                    <p>Ihre Buchung</p>
                </div>
                <div className='legend-element-wrapper'>
                    <div className='legend-color-field default' />
                    <p>Anderes Mitglied</p>
                </div>
            </div>
            <div>
                <div className='legend-element-wrapper'>
                    <div className='legend-color-field event' />
                    <p>Event</p>
                </div>
                <div className='legend-element-wrapper'>
                    <div className='legend-color-field event signed-up' />
                    <p>Event (angemeldet)</p>
                </div>
                <div className='legend-element-wrapper'>
                    <div className='legend-color-field event your-booking signed-up' />
                    <p>Ihr Event</p>
                </div>
            </div>
        </div>
    );
}
