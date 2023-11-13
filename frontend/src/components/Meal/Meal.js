import React, { useState, useEffect } from "react";
import { Card, Form, Button, Modal } from "react-bootstrap";

const Meal = (props) => {
	const [mealName, setName] = useState("");
	const [mealCalories, setCalories] = useState("");

	const [mealDate, setDate] = useState("");
	const [mealId, setId] = useState("");
	const mealTypeOptions = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"];
	const [mealType, setType] = useState(mealTypeOptions[0]);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
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
		setType(e.target.value);
	};

	const handleDateChange = (e) => {
		setDate(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Check if mealName is null before proceeding
		if (!mealName) {
			setErrorMessage("Name not entered");
			return;
		}

		const calories = parseInt(mealCalories, 10);

		if (isNaN(calories)) {
			setErrorMessage("Calories not entered");
			return;
		}

		if (calories < 1) {
			setErrorMessage("Calories cannot be less than 1");
			return;
		}

		// Check if mealDate is empty before proceeding
		if (!mealDate) {
			setErrorMessage("Date not entered");
			return;
		}

		const mealData = {
			id: mealId,
			name: mealName,
			calories: mealCalories,
			mealType: mealType,
			date: mealDate,
		};

		if (props.editMode) {
			// If in "edit" mode, update the meal data
			console.log("UPDATING: ", mealData);
			editMealLog(mealData);
		} else {
			// Default to POST request
			console.log("ADDING: ", mealData);
			addMealLog(mealData);
		}
	};

	const addMealLog = (mealData) => {
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
	};

	const editMealLog = (mealData) => {
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
	};

	return (
		<>
			{errorMessage && (
				<div className="alert alert-danger" role="alert">
					{errorMessage}
				</div>
			)}
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
						as="select"
						value={mealType}
						onChange={handleTypeChange}
					>
						{mealTypeOptions.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</Form.Control>
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
				<Button
					variant="primary"
					type="submit"
					className="mx-auto d-block"
				>
					{props.editMode ? "Update" : "Submit"}
				</Button>
			</Form>
		</>
	);
};

export default Meal;
