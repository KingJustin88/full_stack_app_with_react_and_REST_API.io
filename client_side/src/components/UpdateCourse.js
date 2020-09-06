import React, { Component } from 'react';
import Form from './Form'

export default class UpdateCourse extends Component {   

    // set state
    constructor(props){
        super(props);
        this.state = {
            id: '',
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '', 
            userId: '',
            errors: []
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

        // return rendering the update course with the course details
        return(
            <React.Fragment>                
                <div className="bounds course--detail">
                    <h1>Update Course</h1>                  
                        <Form
                            cancel={this.cancel}
                            errors={errors}
                            submit={this.submit}
                            submitButtonText="Update Course"
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
                                                value={description}
                                                onChange={this.change}
                                                placeholder="Course description..."
                                            />
                                        </div>
                                    </div>
                                    <div className="grid-25 grid-right">
                                        <div className="course--stats">
                                            <ul className="course--stats--list">
                                                <li className="course--stats--list--item">
                                                    <h4>Estimated Time</h4>
                                                    <React.Fragment>
                                                        <input 
                                                            id="estimatedTime" 
                                                            name="estimatedTime" 
                                                            type="text" 
                                                            className="course--time--input"
                                                            placeholder="Hours" 
                                                            value={estimatedTime}
                                                            onChange={this.change}
                                                        />
                                                    </React.Fragment>
                                                </li>
                                                <li className="course--stats--list--item">
                                                    <h4>Materials Needed</h4>
                                                    <React.Fragment>
                                                        <textarea 
                                                            id="materialsNeeded" 
                                                            name="materialsNeeded" 
                                                            value={materialsNeeded}
                                                            onChange={this.change}
                                                            placeholder="List materials..."
                                                        />  
                                                    </React.Fragment>                                     
                                                </li>
                                            </ul>
                                        </div>
                                    </div> 
                                </React.Fragment>
                            )} 
                        />
                </div>
            </React.Fragment>       
        );
    } 


    componentDidMount() {
        //getting the existing course data and display it to change in the update
        const { context } = this.props;
        const courseId = this.props.match.params.id;
        const authUserId = context.authenticatedUser.id;

        context.data.getCourse(courseId)
        .then(course => {
            const courseOwnerId = course.userId
            if (course) {
                if (courseOwnerId === authUserId) {
                    this.setState({
                        id: course.id,
                        title: course.title,
                        description: course.description,
                        estimatedTime: course.estimatedTime,
                        materialsNeeded: course.materialsNeeded,
                        userId: course.userId
                    });
                } else {
                    this.props.history.push('/forbidden');
                }
            } else {
                this.props.history.push('/notfound');
            }
        })
        .catch(err => {
            console.log('Something went wrong: ', err);
            this.props.history.push('/error'); 
        });
    }

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

    // submit for update course
    submit = () => {

        const { context } = this.props;
        //grab credentials
        const emailAddress = context.authenticatedUser.emailAddress;
        const password = context.authenticatedUser.password;

        const {
            id,
            title,
            description,
            estimatedTime,
            materialsNeeded,
        } = this.state;

        // updated course
        const course = {
            id,
            title,
            description,
            estimatedTime,
            materialsNeeded,

        };

        //calling updateCourse
        context.data.updateCourse(course, emailAddress, password)
        .then(errors => {
            if (errors.length) {
                this.setState( {errors} );
            } else {
                console.log(`Course #${course.id} has been succesfully updated!`);
                //after course updated send back to course detail
                this.props.history.push(`/courses/${course.id}`);
            }
        })
        .catch(err => {
            console.log('Something went wrong: ', err);
            this.props.history.push('/error');
        });
    }

    cancel = () => {
        //redirecting back to the course detail page
        this.props.history.push(`/courses/${this.state.id}`);
    }
}
    