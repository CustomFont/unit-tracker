import './App.css'
import React from 'react';
import {  BrowserRouter as Router,  Routes,  Route }   from 'react-router-dom';  
import Registration from './components/registration';
import Splashpage from './components/splashpage';
import AlertRoster from './components/alertroster';
import LeadersPortal from './components/leadersportal';
import Login from './components/login';


function App() {
  return (
    <>
      <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Splashpage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/alertroster' element={<AlertRoster />} />
          <Route path='/leadersportal' element={<LeadersPortal />} />
        </Routes>
      </Router>
      </div>
    </>
  );
}

export default App;
