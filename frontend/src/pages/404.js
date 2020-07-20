import React from 'react';

export default function NotFoundPage(props) {
    const backgroundStyle = {
        // backgroundImage: `url(https://images.unsplash.com/photo-1592162985416-38009bef258e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)`
        backgroundImage: `url(https://images.unsplash.com/photo-1562013434-a802fbbf4db6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=676&q=80)`
    }
     return (
         <div className='wrapper-404' style={backgroundStyle}>
             <div className='inner-404'>
                 <h1>404</h1>
                 <p>nichts gefunden</p>
             </div>
         </div>
    );
}
