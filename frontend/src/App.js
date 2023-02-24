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
<<<<<<< HEAD
          <Route path='/confirm' element={<Confirm />} />
=======
          <Route path='/update/:DODID' element={<UpdateInfo />} />
>>>>>>> 9d735ef4bef19f576ece17b85e668ab6b5ca5d78
        </Routes>
      </div>
    </>
  );
}

export default App;
