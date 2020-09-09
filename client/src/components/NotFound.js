import React from 'react';

const NotFound = () => (
    <React.Fragment>
        <div className="bounds">
            <h1>Not Found</h1>
            <p>Sorry! We couldn't find the page you're looking for.</p>
            <nav><a href="/">Go back</a></nav>
        </div>
    </React.Fragment>
);

export default NotFound;