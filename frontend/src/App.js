import React, { createContext } from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';
// import Login from './components/Login'
// import Registration from './components/Regestration'
// import UserData from './components/UserData'
// import LeaderPortal from './components/LeaderPortal'
import AlertRoster from './components/AlertRoster'

export const ListContext = createContext([])

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path='/' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/userdata' element={<UserData />} />
        <Route path='/leaderportal' element={<LeaderPortal />} /> */}
        <Route path='/alertroster' element={<AlertRoster />} /> 
      </Routes>
    </div>
  );
}

export default App;
