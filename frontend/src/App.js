import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import ExerciseTracker from './components/ExerciseTracker/ExerciseTracker';
import WaterLog from "./components/WaterLog/WaterLog";
import WeekDisplay from "./components/WeekDisplay/WeekDisplay";
import WaterDashboard from "./components/WaterDashboard/WaterDashboard";
import MainDashboard from "./components/MainDashboard/MainDashboard";


function App() {

  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/exercise-tracker" element={<ExerciseTracker/>} /> 
          <Route path="/water" element={<WaterDashboard />} />
          <Route path="/main" element={<MainDashboard />} />
        </Routes>
      
    </div>
  );
}

export default App;
