import './App.css'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes,  Route }   from 'react-router-dom';  
import Registration from './components/registration';
import Splashpage from './components/splashpage';
import AlertRoster from './components/AlertRoster';
import LeadersPortal from './components/LeadersPortal';
import UpdateInfo from './components/updateInfo';
import Confirm from './components/confirm';


function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path='/' element={<Splashpage />} />
          <Route path='/update/:DODID' element={<UpdateInfo />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/alertroster' element={<AlertRoster />} />
          <Route path='/leadersportal' element={<LeadersPortal />} />
          <Route path='/confirm/:DODID' element={<Confirm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
