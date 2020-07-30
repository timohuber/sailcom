import React from 'react';

export default function GenericModalClose(props) {
    return <i className='modal-close-icon' onClick={(e) => props.onClick(e)} />;
}
