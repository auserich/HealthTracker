import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import WaterLog from "./components/WaterLog/WaterLog";
import WeekDisplay from "./components/WeekDisplay/WeekDisplay";
import WaterDashboard from "./components/WaterDashboard/WaterDashboard";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/water" element={<WaterDashboard />} />
			</Routes>
		</div>
	);
}

export default App;
