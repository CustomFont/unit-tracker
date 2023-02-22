import './App.css'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes,  Route }   from 'react-router-dom';  
import Registration from './components/registration';
import Splashpage from './components/splashpage';
import AlertRoster from './components/AlertRoster';
import LeadersPortal from './components/LeadersPortal';
import Update from './components/UpdateInfo';
import UpdateInfo from './components/UpdateInfo';

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path='/' element={<Splashpage />} />
          <Route path='/updateinfo/:DODID' element={<UpdateInfo />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/alertroster' element={<AlertRoster />} />
          <Route path='/leadersportal' element={<LeadersPortal />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
