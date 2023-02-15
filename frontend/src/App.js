import React from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlertRoster from './components/AlertRoster'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/alertroster' element={<AlertRoster />} /> 
      </Routes>
    </div>
  );
}

export default App;
