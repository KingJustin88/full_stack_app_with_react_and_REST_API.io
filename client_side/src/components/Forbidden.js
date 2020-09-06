import React from 'react';

const Forbidden = () => (
    <React.Fragment>
        <div className="bounds">
            <h1>Forbidden</h1>
            <p>Oh oh! You can't access this page.</p>
            <nav><a href="/">Go back</a></nav>
        </div>
    </React.Fragment>
);

export default Forbidden;