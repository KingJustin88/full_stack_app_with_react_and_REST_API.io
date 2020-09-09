import React from 'react';

const UnhandledError = () => (
    <React.Fragment>
        <div className="bounds">
            <h1>Error</h1>
            <p>Sorry! We just encountered an unexpected error.</p>
            <nav><a href="/">Go back</a></nav>
        </div>
    </React.Fragment>
);

export default UnhandledError;
