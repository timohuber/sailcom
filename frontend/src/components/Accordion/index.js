import React from 'react';

export default function Accordion(props) {
    const content = props.content;

    const onClickHandler = (panel_id, icon_id) => {
        document.getElementById(panel_id).classList.toggle('open');
        document.getElementById(icon_id).classList.toggle('fa-chevron-up');       
    };

    return (
        <div className='accordion-wrapper'>
            {content.map((element, i) => {
                const panel_id = `panel-${i}`;
                const icon_id = `icon-${i}`;
                return (
                    <section >
                        <button
                            className='accordion'
                            onClick={(e) => onClickHandler(panel_id, icon_id)}
                        >
                            {element.title}
                            <i class='fas fa-chevron-down' id={icon_id}></i>
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
