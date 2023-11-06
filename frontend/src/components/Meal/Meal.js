import React, { useState, useEffect } from "react";
import { Card, Form, Button, Modal } from "react-bootstrap";

const Meal = (props) => {
	const [mealName, setName] = useState("");
	const [mealCalories, setCalories] = useState("");
	const [mealType, setType] = useState("");
	const [mealDate, setDate] = useState("");
	const [mealId, setId] = useState("");

	useEffect(() => {
		console.log("edit mode enabled!");
		if (props.editMode && props.mealData) {
			if (props.mealData.name) {
				setName(props.mealData.name);
			}
			if (props.mealData.calories) {
				setCalories(props.mealData.calories);
			}
			if (props.mealData.mealType) {
				setType(props.mealData.mealType);
			}
			if (props.mealData.date) {
				setDate(props.mealData.date);
			}
			if (props.mealData.id) {
				setId(props.mealData.id);
			}
		}
	}, [props.editMode, props.mealData]);

	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handleCaloriesChange = (e) => {
		setCalories(e.target.value);
	};

	const handleTypeChange = (e) => {
		setType(e.target.value.toUpperCase());
	};

	const handleDateChange = (e) => {
		setDate(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Check if mealName is null before proceeding
		if (mealName === null) {
			console.error("mealName is null. State might not be updated yet.");
			return;
		}

		const calories = parseInt(mealCalories, 10);

		if (isNaN(calories)) {
			console.error("Invalid input for calories");
			return;
		}

		const mealData = {
			name: mealName,
			calories: mealCalories,
			mealType: mealType,
			date: mealDate,
			id: mealId,
		};

		if (props.editMode) {
			// If in "edit" mode, update the meal data
			mealData.id = props.mealData.id; // Include the meal ID for the PUT request
			console.log("I'm gonna PUT this: ", mealData);

			console.log("mealName:", mealName);
			console.log("mealCalories:", mealCalories);
			console.log("mealType:", mealType);
			console.log("mealDate:", mealDate);
			console.log("mealId:", mealId);

			fetch(`http://localhost:8080/api/meal`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("jwtToken"),
				},
				body: JSON.stringify(mealData),
			})
				.then(console.log("have I crashed yet"))
				.then((response) => response.json())
				.then((data) => {
					console.log("Meal data updated: ", data);
					props.handleClose(); // Close the modal after successful update
				})
				.catch((error) => {
					console.error("Error: ", error);
				});
		} else {
			console.log("name: ", mealName);
			console.log("calories: ", mealCalories);
			console.log("type: ", mealType);
			console.log("date: ", mealDate);

			console.log("I'm gonna POST this: ", mealData);
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
					props.handleClose(); // Close the modal after successful submission
				})
				.catch((error) => {
					console.error("Error: ", error);
				});
		}
	};

	return (
		<>
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
					<Form.Label>Type</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter type"
						value={mealType}
						onChange={handleTypeChange}
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
					{props.editMode ? "Save Changes" : "Submit"}
				</Button>
			</Form>
		</>
	);
};

export default Meal;
