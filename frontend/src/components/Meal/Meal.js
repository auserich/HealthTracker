import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

const Meal = () => {
	const [mealName, setName] = useState("");
	const [mealCalories, setCalories] = useState("");
	const [mealDate, setDate] = useState("");

	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handleCaloriesChange = (e) => {
		setCalories(e.target.value);
	};

	const handleDateChange = (e) => {
		setDate(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const calories = parseInt(mealCalories, 10);

		if (isNaN(calories)) {
			console.error("Invalid input for calories");
			return;
		}

		const mealData = {
			name: mealName,
			calories: mealCalories,
			date: mealDate,
		};

		console.log("name: ", mealName);
		console.log("calories: ", mealCalories);
		console.log("date: ", mealDate);

		fetch("http://localhost:8080/api/meal", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("jwtToken"),
			},
			body: JSON.stringify(mealData),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Data saved: ", data);
			})
			.catch((error) => {
				console.error("Error: ", error);
			});
	};

	return (
		<>
			<div className="centered-container">
				<Card className="log-card">
					<Card.Title>Meal Log</Card.Title>
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter meal name"
								value={mealName}
								onChange={handleNameChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Calories</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter calories"
								value={mealCalories}
								onChange={handleCaloriesChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Date</Form.Label>
							<Form.Control
								type="date"
								placeholder="Enter date"
								value={mealDate}
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

export default Meal;
