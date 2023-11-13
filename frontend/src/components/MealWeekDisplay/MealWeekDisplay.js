import React, { useState, useEffect } from "react";
import {
	Row,
	Col,
	Card,
	Form,
	Button,
	Container,
	Accordion,
	ListGroup,
	Modal,
} from "react-bootstrap";
import "./MealWeekDisplay.css";
import moment from "moment"; // Import Moment.js
import Meal from "../Meal/Meal.js"; // Import the Meal component
import { useNavigate } from "react-router-dom";

const MealWeekDisplay = () => {
	const initialDate = localStorage.getItem("currentDate");
	const [currentDate, setCurrentDate] = useState(
		initialDate ? moment(initialDate) : moment()
	);
	//const [currentDate, setCurrentDate] = useState(moment()); // Initialize with the current date using Moment.js
	const [mealLogs, setMealLogs] = useState([]);
	const [userId, setUserId] = useState(null); // Initialize userId as null
	const days = [];
	const [editMealLogData, setEditMealLogData] = useState(null);
	const [editMode, setEditMode] = useState(false); // Add this state variable
	const navigate = useNavigate();
	const [selectedMealData, setSelectedMealData] = useState(null);

	const [showAddMeal, setShowAddMeal] = useState(false);
	// Function to open the modal
	const openAddMealModal = () => {
		setEditMealLogData(null);
		setEditMode(false); // Set editMode to false when opening the Meal component for adding
		setShowAddMeal(true);
	};
	// Function to close the modal
	const closeAddMealModal = () => {
		setShowAddMeal(false);
	};
	const handleAddMealSubmit = () => {
		// Add any necessary logic or validation here

		// Close the modal
		closeAddMealModal();

		// Clear the selected meal data
		setSelectedMealData(null);
		console.log("still maybe not crashed");

		// Instead of reloading the page, you can update the meal logs for the current week here
		handleRetrieveWeekLogs(userId);
		renderWeekItems();
	};

	const firstDayOfWeek = moment(currentDate);

	// Adjust the firstDayOfWeek to always start from Sunday
	if (currentDate.day() !== 0) {
		firstDayOfWeek.day(0);
	}

	const lastDayOfWeek = moment(firstDayOfWeek).day(6); // Get the last day (Saturday) of the selected week

	const handleDateChange = (e) => {
		// setCurrentDate(moment(e.target.value)); // Update the selected date using Moment.js

		const newDate = moment(e.target.value);
		setCurrentDate(newDate);

		// Fetch the meal logs for the new date
		handleRetrieveWeekLogs(userId, newDate);
		renderWeekItems();
	};

	const handleEditMealLog = (mealLog) => {
		setSelectedMealData(mealLog);
		setEditMode(true); // Set editMode to true when opening the Meal component for editing
		setShowAddMeal(true); // Open the Meal component in edit mode
	};

	useEffect(() => {
		fetchUserId();
		renderWeekItems();
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
		//handleRetrieveWeekLogs(userId);
		localStorage.setItem("currentDate", currentDate.format("YYYY-MM-DD"));
	}, [currentDate]);

	useEffect(() => {
		if (userId) {
			handleRetrieveWeekLogs(userId, currentDate);
		}
	}, [userId, currentDate]);

	const handleRetrieveWeekLogs = (userId, newDate) => {
		// const startDate = firstDayOfWeek.format("YYYY-MM-DD"); // Format the start date
		// const endDate = lastDayOfWeek.format("YYYY-MM-DD"); // Format the end date
		const startDate = moment(newDate).startOf("week").format("YYYY-MM-DD");
		const endDate = moment(newDate).endOf("week").format("YYYY-MM-DD");

		fetchMealLogsForWeek(startDate, endDate, userId);
	};

	// const fetchMealLogsForWeek = (startDate, endDate, userId) => {
	// 	const url = `http://localhost:8080/api/meal/${userId}`;

	// 	console.log("startDate: ", startDate);
	// 	console.log("userId: ", userId);

	// 	fetch(url, {
	// 		method: "GET",
	// 		headers: {
	// 			Authorization: "Bearer " + localStorage.getItem("jwtToken"),
	// 		},
	// 	})
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			console.log("Meal logs from user: ", data);

	// 			// Initialize an array with 7 slots, each initially as an empty array
	// 			const mealLogsForWeek = Array.from({ length: 7 }, () => []);

	// 			// Filter and map the logs that fall within the current week's range
	// 			const logsWithinWeek = data.filter((log) => {
	// 				return log.date >= startDate && log.date <= endDate;
	// 			});

	// 			// Populate the relevant slot in mealLogsForWeek with meal logs
	// 			logsWithinWeek.forEach((log) => {
	// 				const logDate = moment(log.date);
	// 				const dayIndex = logDate.day(); // Get the day index (0-6) of the log's date
	// 				const mealLog = {
	// 					id: log.id,
	// 					calories: log.calories,
	// 					name: log.name,
	// 					mealType: log.mealType, // Replace 'mealType' with the actual property name from your data
	// 				};
	// 				mealLogsForWeek[dayIndex].push(mealLog);
	// 			});

	// 			console.log("Meal logs within the week:", mealLogsForWeek);

	// 			// Set the meal logs state with the filtered data
	// 			setMealLogs(mealLogsForWeek);
	// 		})
	// 		.catch((error) => {
	// 			console.error("Error fetching meal logs:", error);
	// 		});
	// };

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
				console.log("Meal logs from user: ", data);

				// Initialize an array with 7 slots, each initially as an empty array
				const mealLogsForWeek = Array.from({ length: 7 }, () => []);

				// Filter and map the logs that fall within the current week's range
				const logsWithinWeek = data.filter((log) => {
					return log.date >= startDate && log.date <= endDate;
				});

				// Populate the relevant slot in mealLogsForWeek with meal logs
				logsWithinWeek.forEach((log) => {
					const logDate = moment(log.date);
					const dayIndex = logDate.day(); // Get the day index (0-6) of the log's date
					const mealLog = {
						id: log.id,
						calories: log.calories,
						name: log.name,
						mealType: log.mealType, // Replace 'mealType' with the actual property name from your data
					};
					mealLogsForWeek[dayIndex].push(mealLog);
				});

				console.log("Meal logs within the week:", mealLogsForWeek);

				// Set the meal logs state with the filtered data
				setMealLogs(mealLogsForWeek);
			})
			.catch((error) => {
				console.error("Error fetching meal logs:", error);
			});
	};

	const deleteMealLog = (mealLogId) => {
		// Send a DELETE request to the server-side endpoint
		fetch(`http://localhost:8080/api/meal/${mealLogId}`, {
			method: "DELETE",
			headers: {
				Authorization: "Bearer " + localStorage.getItem("jwtToken"),
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Meal data deleted: ", data);
				handleAddMealSubmit(); // close the modal after successful update
			})
			.catch((error) => {
				console.error("Error deleting meal log: ", error);
			});
	};

	const capitalizeFirstLetter = (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
	};

	const totalCaloriesByDay = Array(7).fill(0);

	// const renderMealType = (mealType, index) => {
	// 	const mealTypeIndex = mealType.toLowerCase(); // Convert mealType to lowercase for consistency
	// 	const logsForDay = mealLogs[index] || [];

	// 	const isLogged = isMealTypeLogged(mealLogs, index, mealTypeIndex);
	// 	const mealTypeStyle = isLogged ? "green" : "red";

	// 	return (
	// 		<Row>
	// 			<span style={{ color: mealTypeStyle }}>
	// 				{capitalizeFirstLetter(mealType)}
	// 			</span>
	// 		</Row>
	// 	);
	// };

	const isMealTypeLogged = (mealLogsForWeek, dayIndex, mealType) => {
		const logsForDay = mealLogsForWeek[dayIndex];
		console.log("DAILY LOG FROM INSIDE ISMEALTYPE", logsForDay);
		const result = logsForDay
			? logsForDay.some((log) => log.mealType === mealType)
			: false;
		console.log(
			"LOGSFORDAY, MEALTYPE, CONTAINS?",
			logsForDay,
			mealType,
			result
		);
		return result;
	};

	const renderMealType = (mealType, index) => {
		const mealTypeIndex = mealType.toUpperCase();
		console.log("MEAL LOGS: ", mealLogs);
		const isLogged = isMealTypeLogged(mealLogs, index, mealTypeIndex);

		console.log("INDEX VALUE: ", index);
		console.log("RESULT FOR IF THIS IS LOGGED: ", isLogged, index);
		console.log("RESULT FOR DAILY LOG: ", mealLogs[index]);
		console.log("MEAL TYPE INDEX: ", mealTypeIndex);

		const mealTypeStyle = isLogged ? "green" : "red";

		return (
			<Row>
				<span style={{ color: mealTypeStyle }}>
					{capitalizeFirstLetter(mealType)}
				</span>
			</Row>
		);
	};

	const renderWeekItems = () => {
		const days = [];

		for (let i = 0; i < 7; i++) {
			const day = moment(firstDayOfWeek).day(i);
			const formattedDateKey = day.format("YYYY-MM-DD"); // Format the date as a key
			const formattedMonthYear = day.format("MMMM YYYY");
			const dayOfWeek = day.format("dddd");
			const date = day.format("D");

			const data = mealLogs[i];
			console.log("WHAT IS I? HERE: ", i);
			const renderBreakfast = () => (
				<span>{renderMealType("Breakfast", i)}</span>
			);
			const renderLunch = () => <span>{renderMealType("Lunch", i)}</span>;
			const renderDinner = () => (
				<span>{renderMealType("Dinner", i)}</span>
			);

			// Sum up the calories for all meals on this day
			const calories = data
				? data.reduce((acc, meal) => acc + meal.calories, 0)
				: 0;

			totalCaloriesByDay[i] = calories; // Store the total calories for the day
			const mealName = data
				? data.map((meal) => meal.name).join(", ")
				: "No Meal";
			const mealType = data
				? data.map((meal) => meal.mealType).join(", ")
				: "N/A";

			days.push(
				<Col key={i} className="day-col">
					<Card className="day">
						<Card.Body>
							<Card.Title className="day-info">
								{formattedMonthYear}
								<br />
								{dayOfWeek} {date}
							</Card.Title>
							<p>Calories: {calories}</p>
							{renderBreakfast()}
							{renderLunch()}
							{renderDinner()}
						</Card.Body>
					</Card>
				</Col>
			);
		}

		return days;
	};

	const renderAccordionItems = () => {
		const daysOfWeek = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];

		return daysOfWeek.map((dayOfWeek, index) => {
			const day = moment(firstDayOfWeek).day(index);
			const formattedDate = day.format("MMMM D, YYYY");
			const dateKey = day.format("YYYY-MM-DD");
			const data = mealLogs[index];
			const dayMealLogs = data || []; // Ensure it's an array
			console.log("DATA!!! ", data);

			// Group meal logs by meal type
			const groupedMealLogs = {};
			dayMealLogs.forEach((mealLog) => {
				const mealType = mealLog.mealType;
				if (!groupedMealLogs[mealType]) {
					groupedMealLogs[mealType] = [];
				}
				groupedMealLogs[mealType].push(mealLog);
			});

			return (
				<Accordion.Item key={index} eventKey={index.toString()}>
					<Accordion.Header>
						{dayOfWeek} - {formattedDate}
					</Accordion.Header>
					<Accordion.Body>
						<ListGroup as="ul">
							{Object.entries(groupedMealLogs).map(
								([mealType, logs]) => (
									<React.Fragment key={mealType}>
										<ListGroup.Item
											as="li"
											className="meal-type-header"
											style={{
												fontWeight: "bold",
												height: "55px",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											{capitalizeFirstLetter(mealType)}
										</ListGroup.Item>
										{logs.map((mealLog, mealIndex) => (
											<ListGroup.Item
												key={mealIndex}
												as="li"
											>
												<Row className="align-items-center">
													<Col>{mealLog.name}</Col>
													<Col>
														{mealLog.calories}
													</Col>
													<Col>
														<Button
															className="me-2"
															onClick={() =>
																handleEditMealLog(
																	mealLog
																)
															}
														>
															Edit
														</Button>
														<Button
															onClick={() =>
																deleteMealLog(
																	mealLog.id
																)
															}
															variant="danger"
														>
															Remove
														</Button>
													</Col>
												</Row>
											</ListGroup.Item>
										))}
									</React.Fragment>
								)
							)}
							{Object.keys(groupedMealLogs).length === 0 && (
								<ListGroup.Item
									as="li"
									style={{
										height: "55px",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									No meals logged for this Day
								</ListGroup.Item>
							)}
						</ListGroup>
					</Accordion.Body>
				</Accordion.Item>
			);
		});
	};

	return (
		<>
			<Card className="centered-container week-display">
				<Card.Title>Meal Logs for Week</Card.Title>
				<Form>
					<Form.Group className="mb-3">
						<Form.Label>Choose a Week</Form.Label>
						<Form.Control
							type="date"
							placeholder="Enter date"
							value={currentDate.format("YYYY-MM-DD")}
							onChange={handleDateChange}
						/>
					</Form.Group>
				</Form>
				<Row className="week-container">{renderWeekItems()}</Row>
				<Button onClick={openAddMealModal} className="custom-button">
					Add Meal
				</Button>

				<Modal
					show={showAddMeal}
					onHide={closeAddMealModal}
					backdrop="static"
				>
					<Modal.Header closeButton>
						<Modal.Title className="text-center">
							{editMode ? "Edit Meal" : "Add Meal"}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Meal
							editMode={editMode}
							handleClose={handleAddMealSubmit}
							mealData={selectedMealData}
						/>
					</Modal.Body>
				</Modal>
			</Card>
			<Container className="day-details">
				<Accordion alwaysOpen>{renderAccordionItems()}</Accordion>
			</Container>
		</>
	);
};

export default MealWeekDisplay;
