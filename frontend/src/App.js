import './App.css'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes,  Route }   from 'react-router-dom';  
import Registration from './components/Registration';
import Splashpage from './components/Splashpage';
import AlertRoster from './components/AlertRoster';
import LeadersPortal from './components/LeadersPortal';
import UpdateInfo from './components/UpdateInfo';
import Confirm from './components/Confirm';
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css'
import ClassificationBanner from '@mobdata/classification-banner';

function App() {
  return (
    <>
        <ClassificationBanner classification="secret"/>
      <br />
      <div className="App">
        <Routes>
          <Route path='/' element={<Splashpage />} />
          <Route path='/update' element={<UpdateInfo />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/alertroster' element={<AlertRoster />} />
          <Route path='/leadersportal' element={<LeadersPortal />} />
          <Route path='/confirm' element={<Confirm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
