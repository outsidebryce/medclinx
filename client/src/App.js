import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ClinicListings from './components/ClinicListings';
import ClinicProfile from './components/ClinicProfile';

console.log('App.js is running');

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clinics" element={<ClinicListings />} />
          <Route path="/clinics/:id" element={<ClinicProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;