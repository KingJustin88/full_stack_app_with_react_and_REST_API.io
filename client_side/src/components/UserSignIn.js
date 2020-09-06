import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {

    // set state
    constructor(props){
      super(props);
      this.state = {
        emailAddress: '',
        password: '',
        errors: [],
      }
  }
  
    render() {
      const {
        emailAddress,
        password,
        errors,
      } = this.state;

        // returns and render the sign up menu
        return (
            <div>
                <div className="bounds">
                    <div className="grid-33 centered signin">
                    <h1>Sign In</h1>    
                        <Form
                            cancel={this.cancel}
                            errors={errors}
                            submit={this.submit}
                            submitButtonText="Sign In"
                            elements={() => (
                                <React.Fragment>
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
                                </React.Fragment>
                            )} />
                      <p>Don't have a user account? <Link to="signup">Click here</Link> to sign up!</p>
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

    // submit for sign in
    submit = () => { 
      const { context } = this.props;
      const { from } = this.props.location.state || { from: { pathname: '/' } };
      const { emailAddress, password } = this.state;
  
      context.actions.signIn(emailAddress, password)
        .then((user) => {
          if (user === null) {
            this.setState(() => {
              return { errors: [ 'Sign-in was unsuccessful' ] };
            });
          } else {
            this.props.history.push(from);
          }
        })
        .catch((error) => {
          console.error(error);
          this.props.history.push('/error');
        });
    }
  
    cancel = () => {
      this.props.history.push('/');
    }
}
