import { Routes, Route } from 'react-router-dom';import React from 'react';
import './App.css';
import TrackingPlanListView from './layouts/TrackingPlanListView';
import TrackingPlanAdd from './layouts/TrackingPlanAdd';
import NavBar from './components/NavBar';

function App() {

  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<TrackingPlanListView/>} />
        <Route path="/add" element={<TrackingPlanAdd />} />
      </Routes>
    </>
 )
}

export default App;
