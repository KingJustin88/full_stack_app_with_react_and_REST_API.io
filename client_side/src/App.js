import React from 'react'; 
import {
    BrowserRouter as Router,
    Route,
    Switch
  } from 'react-router-dom';

  
// importing components
import Header from './components/Header'
import Courses from './components/Courses'
import UserSignIn from './components/UserSignIn'
import UserSignUp from './components/UserSignUp'
import CourseDetail from './components/CourseDetail'
import CreateCourse from './components/CreateCourse'
import UpdateCourse from './components/UpdateCourse'
import UserSignOut from './components/UserSignOut'
import NotFound from './components/NotFound'
import UnhandledError from './components/UnhandledError'
import Forbidden from './components/Forbidden'
import PrivateRoute from './PrivateRoute'


// importing components with Context
import withContext from './Context'

const HeaderWithContext = withContext(Header);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignOutWithContext = withContext(UserSignOut);


  export default () => (
    <Router>
      <div className="App">
        <HeaderWithContext />
          <Switch>
            <Route exact path="/" component={CoursesWithContext} />
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpWithContext} />         
            <Route path="/courses/:id" component={CourseDetailWithContext} />
            <PrivateRoute path="/create" component={CreateCourseWithContext} />
            <PrivateRoute path="/update/:id" component={UpdateCourseWithContext} />
            <Route path="/signout" component={UserSignOutWithContext}/>
            <Route path="/error" component={UnhandledError} />
            <Route path="/forbidden" component={Forbidden} />
            <Route path="/notfound" component={NotFound} />
            <Route component={NotFound}/>
          </Switch>
      </div>
    </Router>
  );