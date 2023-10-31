import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import "./WeekDisplay.css";
import moment from "moment"; // Import Moment.js

const WeekDisplay = () => {
	const [currentDate, setCurrentDate] = useState(moment()); // Initialize with the current date using Moment.js
	const [waterLogs, setWaterLogs] = useState({});
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
	}, []);

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

				// Now, you have the user's ID, so you can use it to fetch water logs
				setUserId(user_id); // Set userId in the component's state
			})
			.catch((error) => {
				console.error("Error fetching user data:", error);
			});
	};

	const handleRetrieveWeekLogs = (userId) => {
		const startDate = firstDayOfWeek.format("YYYY-MM-DD"); // Format the start date
		const endDate = lastDayOfWeek.format("YYYY-MM-DD"); // Format the end date

		fetchWaterLogsForWeek(startDate, endDate, userId);
	};

	const fetchWaterLogsForWeek = (startDate, endDate, userId) => {
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

				// Aggregate the ounces for each date within the current week's range
				const waterLogsByDate = {};

				// Filter and map the logs that fall within the current week's range
				const logsWithinWeek = data.filter((log) => {
					return log.date >= startDate && log.date <= endDate;
				});

				data.forEach((log) => {
					if (log.date >= startDate && log.date <= endDate) {
						if (waterLogsByDate[log.date]) {
							// If the date already exists, add the ounces to the existing total
							waterLogsByDate[log.date] += log.ounces;
						} else {
							// If the date is encountered for the first time, set the ounces as is
							waterLogsByDate[log.date] = log.ounces;
						}
					}
				});

				console.log("Water logs within the week:", waterLogsByDate);

				// Set the water logs state with the filtered data
				setWaterLogs(waterLogsByDate);
			})
			.catch((error) => {
				console.error("Error fetching water logs:", error);
			});
	};

	for (let i = 0; i < 7; i++) {
		const day = moment(firstDayOfWeek).day(i);

		const formattedDate = day.format("dddd, MMMM D, YYYY");
		const ounces = waterLogs[day.format("YYYY-MM-DD")] || 0;

		days.push(
			<Col key={i}>
				<Card className="day">
					<Card.Body>
						<Card.Title className="day-name">
							{formattedDate}
						</Card.Title>
						<p>Ounces: {ounces}</p> {/* Display the ounces value */}
					</Card.Body>
				</Card>
			</Col>
		);
	}

	return (
		<>
			<Card>
				<Row>{days}</Row>
			</Card>
			<Card className="centered-container water-log">
				<Card.Title>Data Fetcher</Card.Title>
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
					<Button
						variant="primary"
						onClick={() => handleRetrieveWeekLogs(userId)}
					>
						Get Logs
					</Button>
				</Form>
			</Card>
		</>
	);
};

export default WeekDisplay;
