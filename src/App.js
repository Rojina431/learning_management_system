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
import TeacherSubject from './components/Teacher/subjectcomponent';

function App() {
  return (
    <Router>
      <React.Suspense fallback={Loading}>
      <Routes>
        <Route path='/signup' exact element={<SignupComponent/>}/>
        <Route path='/login' exact element={<LoginComponent/>}/>
        <Route path='/teacher/subject' exact element={<TeacherSubject/>}/>
        <Route path='/' exact element={<ViewsComponent/>}/>
      </Routes>
      </React.Suspense>
    </Router>
  );
}


export default App;
