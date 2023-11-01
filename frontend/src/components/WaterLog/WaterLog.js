import React, { Component, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import WeekDisplay from "../WeekDisplay/WeekDisplay.js";
import "./WaterLog.css";

const WaterLog = () => {
	const [waterOunces, setWaterOunces] = useState("");
	const [waterDate, setWaterDate] = useState("");

	const [testDate, setTestDate] = useState("");

	const handleOuncesChange = (e) => {
		setWaterOunces(e.target.value);
	};

	const handleDateChange = (e) => {
		setWaterDate(e.target.value);
	};

	const handleTestDateChange = (e) => {
		setTestDate(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const ounces = parseInt(waterOunces, 10);

		if (isNaN(ounces)) {
			console.error("Invalid input for ounces.");
			return;
		} else {
			console.log("Yay int");
		}

		const waterLogData = {
			ounces: waterOunces,
			date: waterDate,
		};

		console.log("ounces: ", waterOunces);
		console.log("date: ", waterDate);

		fetch("http://localhost:8080/api/water", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("jwtToken"),
			},
			body: JSON.stringify(waterLogData),
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
		fetchWaterLogsForWeek(formattedDate, userId); // Replace 'userId' with the actual user ID
	};

	const fetchWaterLogsForWeek = (startDate, userId) => {
		const url = `http://localhost:8080/api/water/${userId}`;

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
				console.log("Water logs for the week:", data);
				// Update your state or do something with the data
			})
			.catch((error) => {
				console.error("Error fetching water logs:", error);
			});
	};

	return (
		<>
			<div className="centered-container">
				<Card className="water-log">
					<Card.Title>Water Log</Card.Title>
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3">
							<Form.Label>Ounces of Water</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter ounces"
								value={waterOunces}
								onChange={handleOuncesChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Date</Form.Label>
							<Form.Control
								type="date"
								placeholder="Enter date"
								value={waterDate}
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

export default WaterLog;
