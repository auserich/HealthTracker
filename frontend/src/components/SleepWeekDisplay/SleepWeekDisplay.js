import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import "./SleepWeekDisplay.css";
import moment from "moment"; // Import Moment.js

const SleepWeekDisplay = () => {
	const [currentDate, setCurrentDate] = useState(moment()); // Initialize with the current date using Moment.js
	const [sleepLogs, setSleepLogs] = useState({});
	const [userId, setUserId] = useState(null); // Initialize userId as null
	const days = [];

	const firstDayOfWeek = moment(currentDate);

	// Adjust the firstDayOfWeek to always start from Sunday
	if (currentDate.day() !== 0) {
		firstDayOfWeek.day(0);
	}

	const lastDayOfWeek = moment(firstDayOfWeek).day(6); // Get the last day (Saturday) of the selected week

	const handleDateChange = (e) => {
		setCurrentDate(moment(e.target.value)); // Update the selected date using Moment.js
	};

	useEffect(() => {
		fetchUserId();
		handleRetrieveWeekLogs(userId);
	}, [currentDate]);

	useEffect(() => {
		if (userId) {
			handleRetrieveWeekLogs(userId);
		}
	}, [userId]);

	const fetchUserId = () => {
		// Make a request to your "whoami" endpoint to get the user's ID
		fetch("http://localhost:8080/api/user/whoami", {
			method: "GET",
			headers: {
				Authorization: "Bearer " + localStorage.getItem("jwtToken"),
			},
		})
			.then((response) => response.json())
			.then((data) => {
				// Assuming the user's ID is stored in a property called "id" in the response data
				const user_id = data.id;

				// Now, you have the user's ID, so you can use it to fetch sleep logs
				setUserId(user_id); // Set userId in the component's state
			})
			.catch((error) => {
				console.error("Error fetching user data:", error);
			});
	};

	const handleRetrieveWeekLogs = (userId) => {
		const startDate = firstDayOfWeek.format("YYYY-MM-DD"); // Format the start date
		const endDate = lastDayOfWeek.format("YYYY-MM-DD"); // Format the end date

		fetchSleepLogsForWeek(startDate, endDate, userId);
	};

	const fetchSleepLogsForWeek = (startDate, endDate, userId) => {
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
				console.log("Sleep logs for the week:", data);

				// Aggregate the ounces for each date within the current week's range
				const sleepLogsByDate = {};

				// Filter and map the logs that fall within the current week's range
				const logsWithinWeek = data.filter((log) => {
					return log.date >= startDate && log.date <= endDate;
				});

				data.forEach((log) => {
					if (log.date >= startDate && log.date <= endDate) {
						if (sleepLogsByDate[log.date]) {
							// If the date already exists, add the ounces to the existing total
							sleepLogsByDate[log.date] += log.minutes;
						} else {
							// If the date is encountered for the first time, set the minutes as is
							sleepLogsByDate[log.date] = log.minutes;
						}
					}
				});

				console.log("Sleep logs within the week:", sleepLogsByDate);

				setSleepLogs(sleepLogsByDate);
			})
			.catch((error) => {
				console.error("Error fetching sleep logs:", error);
			});
	};

	for (let i = 0; i < 7; i++) {
		const day = moment(firstDayOfWeek).day(i);
		const formattedMonthYear = day.format("MMMM YYYY");
		const dayOfWeek = day.format("dddd");
		const date = day.format("D");
		const data = sleepLogs[day.format("YYYY-MM-DD")];
		const minutes = sleepLogs[day.format("YYYY-MM-DD")] || 0;

		days.push(
			<Col key={i}>
				<Card className="day">
					<Card.Body>
						<Card.Title className="day-info">
							{formattedMonthYear}
							<br />
							{dayOfWeek} {date}
						</Card.Title>
						<p>Minutes: {minutes}</p>
					</Card.Body>
				</Card>
			</Col>
		);
	}

	return (
		<>
			<Card className="centered-container week-display">
				<Card.Title>Week Display</Card.Title>
				<Form>
					<Form.Group className="mb-3">
						<Form.Label>Choose a Week</Form.Label>
						<Form.Control
							type="date"
							placeholder="Enter date"
							value={currentDate.format("YYYY-MM-DD")} // Use Moment.js to format the date
							onChange={handleDateChange}
						/>
					</Form.Group>
				</Form>
				<Row className="week-container">{days}</Row>
			</Card>
		</>
	);
};

export default SleepWeekDisplay;
