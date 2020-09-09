import React from 'react';
import { NavLink } from 'react-router-dom';

export default ({ context }) => {
   
// grabs names from auth when user signs in to be rendered and displayed in header
const authUser = context.authenticatedUser;
    
    return (
        <React.Fragment>
            <div>
                <title>Courses</title>
            </div>
            <div className="header">
                <div className="bounds">
                <NavLink className="header--logo" to="/">Courses</NavLink>
                <nav>
                    {authUser ? (
                        <React.Fragment>
                            <span>Hi {`${authUser.firstName}  ${authUser.lastName}`}! </span>
                            <NavLink className="signout" to="/signout">Sign Out</NavLink>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <NavLink className="signup" to="/signup">Sign Up</NavLink>
                            <NavLink className="signin" to="/signin">Sign In</NavLink>
                        </React.Fragment>
                    )}
                </nav>
                </div>
            </div>
            <hr />
        </React.Fragment>
    );
}
