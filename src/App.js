import React from 'react';
import {
BrowserRouter as Router,
Route,
Routes
} from 'react-router-dom'
import SignupComponent from './components/Account/signup';
import Loading from './loading'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import LoginComponent from './components/Account/login';
import ViewsComponent from './components/Views';
import TeacherComponent from './components/Teacher/teachercomponent';
import StudentComponent from './components/Student/studentcomponent';
import TeacherMeeting from './components/Teacher/teachermeeting';
import StudentMeeting from './components/Student/studentmeeting';

function App() {
  return (
    <Router>
      <React.Suspense fallback={Loading}>
      <Routes>
        <Route path='/signup' exact element={<SignupComponent/>}/>
        <Route path='/login' exact element={<LoginComponent/>}/>
        <Route path='/teacher/subject' exact element={<TeacherComponent/>}/>
        <Route path='/student/class' exact element = {<StudentComponent/>}/>
        <Route path='/teacher/meeting' exact element={<TeacherMeeting/>}/>
        <Route path='/student/meeting' exact element = {<StudentMeeting/>}/>
        <Route path='/' exact element={<ViewsComponent/>}/>
      </Routes>
      </React.Suspense>
    </Router>
  );
}


export default App;
