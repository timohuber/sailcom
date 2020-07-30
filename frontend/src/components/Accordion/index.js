import React from 'react';
import {toggleAccordionHandler} from '../../lib/helpers/filters'

export default function Accordion(props) {
    const content = props.content;

    return (
        <div className='accordion-wrapper'>
            {content.map((element, i) => {
                const panel_id = `panel-${i}`;
                const icon_id = `icon-${i}`;
                return (
                    <section >
                        <button
                            className='accordion'
                            onClick={(e) => toggleAccordionHandler(panel_id, icon_id)}
                        >
                            {element.title}
                            <i className='fas fa-chevron-down' id={icon_id}></i>
                        </button>
                        <div className='panel' id={panel_id}>
                            <div className='inner'>{element.content}</div>
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
