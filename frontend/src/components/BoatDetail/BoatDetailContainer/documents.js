import React from 'react';

export default function BoatDocuments(props) {
    const documents = props.documents
    if(!documents.length) {
        return null
    }
    return (
        <div className='boat-documents'>
            <p><strong>Dokumente</strong></p>
            {documents.map( document => {
                return <a className={`document ${document.type}`} href={document.document} target='_blank'>{document.name}</a>
            })}
          </div>
    );
};
