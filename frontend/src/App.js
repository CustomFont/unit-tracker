import './App.css'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes,  Route }   from 'react-router-dom';  
import Registration from './components/Registration';
import Splashpage from './components/Splashpage';
import AlertRoster from './components/AlertRoster';
import LeadersPortal from './components/LeadersPortal';
import UpdateInfo from './components/UpdateInfo';

function App() {
  return (
    <>
      <div className="classification">
        CUI
      </div>
      <br />
      <div className="App">
        <Routes>
          <Route path='/' element={<Splashpage />} />
          <Route path='/update' element={<UpdateInfo />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/alertroster' element={<AlertRoster />} />
          <Route path='/leadersportal' element={<LeadersPortal />} />
          <Route path='/update/:DODID' element={<UpdateInfo />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
