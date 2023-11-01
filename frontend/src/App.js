import React from "react";
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import ExerciseTracker from './components/ExerciseTracker/ExerciseTracker';

function App() {

  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/exercise-tracker" element={<ExerciseTracker/>} /> 
        </Routes>
      
    </div>
  );
}

export default App;

