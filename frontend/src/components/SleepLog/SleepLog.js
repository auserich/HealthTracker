import React, { Component, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import SleepWeekDisplay from '../SleepWeekDisplay/SleepWeekDisplay.js';
import "./SleepLog.css";

const SleepLog = () => {
	const [sleepMinutes, setSleepMinutes] = useState("");
	const [sleepDate, setSleepDate] = useState("");
	const [testDate, setTestDate] = useState("");

	const handleMinutesChange = (e) => {
		setSleepMinutes(e.target.value);
	};

	const handleDateChange = (e) => {
		setSleepDate(e.target.value);
	};

	const handleTestDateChange = (e) => {
		setTestDate(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const minutes = parseInt(sleepMinutes, 10);

		if (isNaN(minutes)) {
			console.error("Invalid input for minutes.");
			return;
		}
		const sleepLogData = {
			minutes: sleepMinutes,
			date: sleepDate,
		};

		console.log("minutes: ", sleepMinutes);
		console.log("date: ", sleepDate);

		fetch("http://localhost:8080/api/sleep", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("jwtToken"),
			},
			body: JSON.stringify(sleepLogData),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Data saved:", data); 
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const userId = 1;
	// Call the function with the selected date and userId
	const handleRetrieveWeekLogs = () => {
		const formattedDate = new Date(testDate).toISOString().split("T")[0];
		fetchSleepLogsForWeek(formattedDate, userId); // Replace 'userId' with the actual user ID
	};

	const fetchSleepLogsForWeek = (startDate, userId) => {
		const url = `http://localhost:8080/api/sleep/${userId}`;

		console.log("startDate: ", startDate);
		console.log("userId: ", userId);

		fetch(url, {
			method: "GET",
			headers: {
				Authorization: "Bearer " + localStorage.getItem("jwtToken"),
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Weekly Sleep logs:", data);
				// Update your state or do something with the data
			})
			.catch((error) => {
				console.error("Error fetching sleep logs", error);
			});
	};

	return (
		<>
			<div className="centered-container">
				<Card className="sleep-log">
					<Card.Title>Sleep Log</Card.Title>
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3">
							<Form.Label>Minutes of Sleep</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter minutes"
								value={sleepMinutes}
								onChange={handleMinutesChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Date</Form.Label>
							<Form.Control
								type="date"
								placeholder="Enter date"
								value={sleepDate}
								onChange={handleDateChange}
							/>
						</Form.Group>
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				</Card>
			</div>
		</>
	);
};

export default SleepLog;