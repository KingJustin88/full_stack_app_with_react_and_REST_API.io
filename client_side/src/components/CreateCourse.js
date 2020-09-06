import React, { Component } from 'react';
import Form from  './Form'

export default class CreateCourse extends Component {

    // set state
    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
            userId: '',
            errors: [],
        }
    }
 
    render() {
        // grab data
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors
          } = this.state;
        
        // return rendering the create course option  
        return(
            <React.Fragment>                
                <div className="bounds course--detail">
                    <h1>Create Course</h1>
                    <div>                    
                        <Form
                            cancel={this.cancel}
                            errors={errors}
                            submit={this.submit}
                            submitButtonText="Create Course"
                            elements={() => (
                                <React.Fragment>
                                    <div className="grid-66">
                                        <div className="course--header">
                                            <h4 className="course--label">Course</h4>
                                            <input 
                                                id="title" 
                                                name="title" 
                                                type="text" 
                                                className="input-title course--title--input" 
                                                placeholder="Course title..."
                                                value={title}
                                                onChange={this.change}
                                            />
                                        </div>
                                        <div className="course--description">
                                            <textarea 
                                                id="description" 
                                                name="description" 
                                                placeholder="Course description..."
                                                value={description}
                                                onChange={this.change}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid-25 grid-right">
                                        <div className="course--stats">
                                            <ul className="course--stats--list">
                                                <li className="course--stats--list--item">
                                                    <h4>Estimated Time</h4>
                                                    <input 
                                                        id="estimatedTime" 
                                                        name="estimatedTime" 
                                                        type="text" 
                                                        className="course--time--input"
                                                        placeholder="Hours" 
                                                        value={estimatedTime}
                                                        onChange={this.change}
                                                    />
                                                </li>
                                                <li className="course--stats--list--item">
                                                    <h4>Materials Needed</h4>
                                                    <textarea 
                                                        id="materialsNeeded" 
                                                        name="materialsNeeded" 
                                                        className="" 
                                                        placeholder="List materials..."
                                                        value={materialsNeeded}
                                                        onChange={this.change}
                                                    />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )}
                        />
                    </div>
                </div>
            </React.Fragment>
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

    // submit for create course
    submit = () => {

        const { context } = this.props;
        //grab credentials
        const emailAddress = context.authenticatedUser.emailAddress;
        const password = context.authenticatedUser.password;

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state;

        // updated course
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: context.authenticatedUser.id
        }

        

        //calling updateCourse from Data.js from routes/course
        context.data.createCourse(course, emailAddress, password)
        .then(errors => {
            if (errors.length) {
                this.setState( {errors} );
            } else {
                console.log(`"${course.title}" has been succesfully created!`);
                //after course updated send back to course detail
                this.props.history.push(`/`);
            }
        })

        .catch( course => {
            if (course) {
                this.setState(() => {
                  return { errors: [ 'Course creation was unsuccessful, title and description is required' ] };
                });
              }
        });
    }

    cancel = () => {
        //redirecting back to the course detail page
        this.props.history.push(`/`);
    }
}