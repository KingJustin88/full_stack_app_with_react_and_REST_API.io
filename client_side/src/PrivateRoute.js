import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

// gives users permission with authenticatedUser to update or create course on that userId
// will send an error if denied
export default ({ component: Component, ...rest }) => {
    
    return (
        <Consumer>
            {context => (
                <Route 
                    {...rest}
                    render={props => {
                        const { authenticatedUser } = context;
                        if (authenticatedUser) {
                            return (
                                <Component {...props} />
                            );
                        } else {
                            return (
                                <Redirect to={{
                                pathname: '/signin',
                                state: { from: props.location }
                                }} />
                            );
                        }
                    }}
                />
            )}
        </Consumer>
    );
};