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

function App() {
  return (
    <>
    <Router>
      <React.Suspense fallback={Loading}>
      <Routes>
        <Route path='/signup' exact element={<SignupComponent/>}/>
        <Route path='/' exact element={<Home/>}/>
      </Routes>
      </React.Suspense>
    </Router>
    </>
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default App;
