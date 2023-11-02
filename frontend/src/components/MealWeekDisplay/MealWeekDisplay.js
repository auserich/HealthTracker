import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import "./MealWeekDisplay.css";
import moment from "moment"; // Import Moment.js

const MealWeekDisplay = () => {
	const [currentDate, setCurrentDate] = useState(moment()); // Initialize with the current date using Moment.js
	const [mealLogs, setMealLogs] = useState({});
	const [expandedDays, setExpandedDays] = useState([]);
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

				// Now, you have the user's ID, so you can use it to fetch meal logs
				setUserId(user_id); // Set userId in the component's state
			})
			.catch((error) => {
				console.error("Error fetching user data:", error);
			});
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

	const handleRetrieveWeekLogs = (userId) => {
		const startDate = firstDayOfWeek.format("YYYY-MM-DD"); // Format the start date
		const endDate = lastDayOfWeek.format("YYYY-MM-DD"); // Format the end date

		fetchMealLogsForWeek(startDate, endDate, userId);
	};

	const fetchMealLogsForWeek = (startDate, endDate, userId) => {
		const url = `http://localhost:8080/api/meal/${userId}`;

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
				console.log("Meal logs for the week:", data);

				// Aggregate the calories for each date within the current week's range
				const mealLogsByDate = {};

				// Filter and map the logs that fall within the current week's range
				const logsWithinWeek = data.filter((log) => {
					return log.date >= startDate && log.date <= endDate;
				});

				logsWithinWeek.forEach((log) => {
					const logDate = log.date;
					if (!mealLogsByDate[logDate]) {
						mealLogsByDate[logDate] = {
							calories: 0,
							mealNames: [],
						};
					}
					mealLogsByDate[logDate].calories += log.calories;
					mealLogsByDate[logDate].mealNames.push(log.name);
				});

				console.log("Meal logs within the week:", mealLogsByDate);

				// Set the meal logs state with the filtered data
				setMealLogs(mealLogsByDate);
			})
			.catch((error) => {
				console.error("Error fetching meal logs:", error);
			});
	};

	const capitalizeFirstLetter = (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
	};

	for (let i = 0; i < 7; i++) {
		const day = moment(firstDayOfWeek).day(i);
		const formattedMonthYear = day.format("MMMM YYYY");
		const dayOfWeek = day.format("dddd");
		const date = day.format("D");
		const data = mealLogs[day.format("YYYY-MM-DD")];
		const calories = data ? data.calories : 0;
		const mealNames = data
			? data.mealNames.map((name) => capitalizeFirstLetter(name))
			: [];

		days.push(
			<Col key={i}>
				<Card className="day">
					<Card.Body>
						<Card.Title className="day-info">
							{formattedMonthYear}
							<br />
							{dayOfWeek} {date}
						</Card.Title>
						<p>Calories: {calories}</p>
						{mealNames.length > 0 ? (
							<p>Meals: {mealNames.join(", ")}</p>
						) : (
							<p>No Meals</p>
						)}
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

export default MealWeekDisplay;
