import React from "react";
import WaterLog from "../WaterLog/WaterLog";
import WeekDisplay from "../WeekDisplay/WeekDisplay";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const WaterDashboard = () => {
	const navigate = useNavigate();

	const handleNavigateToMain = () => {
		navigate("/main");
	};

	return (
		<>
			<h3>Water Dashboard</h3>

			<WeekDisplay />
			<WaterLog />
			<Button onClick={handleNavigateToMain}>Back To Dashboard</Button>
		</>
	);
};

export default WaterDashboard;
