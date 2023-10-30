import React from "react";
import WaterLog from "../WaterLog/WaterLog";
import WeekDisplay from "../WeekDisplay/WeekDisplay";

function WaterDashboard() {
	return (
		<>
			<h3>Water Dashboard</h3>
			<WaterLog />
			<WeekDisplay />
		</>
	);
}

export default WaterDashboard;
