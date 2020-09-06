import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component { 
    
    //set state
    constructor(props){
      super(props);
      this.state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: [],
      }
  }
  
    render() {
      const {
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword,
        errors,
      } = this.state;

      // returns and render the sign up menu
      return (
          <div>
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Sign Up"
                        elements={() => (
                          <React.Fragment>
                            <input 
                                id="firstName" 
                                name="firstName" 
                                type="text" 
                                className="" 
                                placeholder="First Name" 
                                value={firstName}
                                onChange={this.change} 
                            />
                            <input 
                                id="lastName" 
                                name="lastName" 
                                type="text" 
                                className="" 
                                placeholder="Last Name" 
                                value={lastName}
                                onChange={this.change} 
                            />
                            <input 
                                id="emailAddress" 
                                name="emailAddress" 
                                type="text" 
                                className="" 
                                placeholder="Email Address" 
                                value={emailAddress}
                                onChange={this.change} 
                            />
                            <input 
                                id="password" 
                                name="password" 
                                type="password" 
                                className="" 
                                placeholder="Password" 
                                value={password}
                                onChange={this.change} 
                            />
                            <input 
                                id="confirmPassword" 
                                name="confirmPassword" 
                                type="password" 
                                className="" 
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={this.change} 
                            />
                          </React.Fragment>
                        )}
                    />
                  <p>Already have a user account? <Link to="signin">Click here</Link> to sign in!</p>
                </div>
            </div>
          </div>
      )
    }

    // Functions

    // option to type in the field and change value
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
    }

    // submit for sign up
    submit = () => {

      const { context } = this.props;
      const { 
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword
      } = this.state;
  
      // new user payload
      const user = {
        firstName,
        lastName,
        emailAddress,
        password,
      };
      
      // if the passwords match then the user will be created
      if(confirmPassword === password) {
        context.data.createUser(user)
        .then( errors => {
          if (errors.length) {
            this.setState(() => {
              return { errors };
            });
          } else {
            console.log("Success Sign-Up")
            context.actions.signIn(emailAddress, password)
              .then(() => {
                this.props.history.push('/signin');
              });
          }
        })
        .catch( user => {
          if (user) {
            this.setState(() => {
              return { errors: [ 'Sign-in was unsuccessful, please fill in the missing requirements' ] };
            });
          }
        })
      } else if (user) {
        this.setState(() => {
          return { errors: [ 'Passwords did not match' ] };
        });
      }
    }
  
    cancel = () => {
      this.props.history.push('/'); 
    }
}