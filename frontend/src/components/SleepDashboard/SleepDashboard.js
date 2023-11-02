import React from "react";
import SleepLog from "../SleepLog/SleepLog";
import SleepWeekDisplay from "../SleepWeekDisplay/SleepWeekDisplay";

function SleepDashboard() {
	return (
		<>
			<h3>Sleep Dashboard</h3>
			<SleepWeekDisplay />
			<SleepLog />
		</>
	);
}

export default SleepDashboard;
