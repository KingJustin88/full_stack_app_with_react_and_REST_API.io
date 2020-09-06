import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class CoursePage extends Component { 

    // set state
    constructor(props){
        super(props);
        this.state = {
            courses: []
        }
    }
            
    render() { 
        // grabbing data and mapping each course available out
        const courses  = this.state.courses;       
        const coursesArray = courses.map(course => {
            return (
                <div key={course.id} className="grid-33">
                    <Link className="course--module course--link" to={`/courses/${course.id}`}>
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{course.title}</h3>
                    </Link>
                </div>
            );
        })     
        
        // return rendering the coursesArray and the new course option
        return (
            <React.Fragment>
                <div className="bounds">
                    {coursesArray}
                    <div className="grid-33">
                        <Link className="course--module course--add--module" to="/create">
                            <h3 className="course--add--title">
                                <svg 
                                    version="1.1" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    x="0px" 
                                    y="0px"
                                    viewBox="0 0 13 13" 
                                    className="add"
                                >
                                <polygon 
                                    points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 ">   
                                </polygon>
                                </svg>
                                    New Course
                            </h3>
                        </Link>
                    </div>
                </div>
            </React.Fragment>   
            
        );
    }
    
    // getting data from courses through context and display them   
    componentDidMount() {
        const { context } = this.props;
        context.data.getCourses()
        .then(courseData => {
            this.setState({
                courses: courseData
            });
        })
        .catch(err => {
            console.log('Something went wrong: ', err);
            this.props.history.push('/error');
        });
    }
}
