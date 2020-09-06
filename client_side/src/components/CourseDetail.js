import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default class CourseDetail extends Component {
    
    // set state
    constructor(props){
        super(props);
        this.state = {
            courseDetail: [],
        }    
    }

    render() {
        // grab data through context
        const { 
            id, 
            title, 
            description, 
            estimatedTime, 
            materialsNeeded
        } = this.state.courseDetail;

        // return rendering details of the course, with update, delete and return to list of course buttons
        return (
            <React.Fragment>
                <div>
                    <div className="actions--bar">
                        <div className="bounds">
                            <div className="grid-100">
                                <span>
                                    <Link 
                                        className="button" 
                                        to={`/update/${id}`}
                                    >   Update Course</Link>
                                    <button 
                                        className="button" 
                                        to={`/update/${id}`}
                                        onClick={this.deleteDetailCourse}
                                    >   Delete Course</button>
                                </span>
                                    <a 
                                        className="button button-secondary" 
                                        href="/"
                                    >   Return to List</a>
                            </div>
                        </div>
                    </div>
                    <div className="bounds course--detail">
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <h3 className="course--title">{title}</h3>
                            </div>
                            <div className="course--description">
                                <ReactMarkdown source={description}/>
                            </div>
                        </div>

                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <h3>{estimatedTime}</h3>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                            <ul>
                                                <ReactMarkdown source={materialsNeeded}/>
                                            </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    //Functions

    // gets the right course details using id to match to be displayed
    componentDidMount() {
        const { context } = this.props;
        const id = this.props.match.params.id;
        context.data.getCourse(id)
            .then(course => {
                if (course) {
                    this.setState({
                        courseDetail: course
                    });
                } else {
                    this.props.history.push('/notfound');
                }
            })
            .catch(err => {
                console.log('Something wrong', err);
                this.props.history.push('/error')
            }) 
    }

    // deletes course with the right authentication and with the right course, will not delete until the right user is signed in
    deleteDetailCourse = () => {
        if(window.confirm('Are you positive you want to delete?')) {
        console.log('Delete Confirmed')

        // grabs id and authentications for user to delete course
        const id = this.props.match.params.id;
        const { context } = this.props;
        const emailAddress = context.authenticatedUser ? context.authenticatedUser.emailAddress : null;
        const password = context.authenticatedUser ? context.authenticatedUser.password : null;

        // using delete function from Data.js from routes/course.js
        context.data.deleteCourse(id, emailAddress, password)
        .then(() => {
            this.props.history.push('/')
        })
        .catch(err => {
            console.log('Something wrong', err) 
            this.props.history.push('/error');
        });
        } else {
        console.log('Delete Canceled')
        } 
    }
}