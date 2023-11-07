import React, { Component, useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import WeekDisplay from "../WeekDisplay/WeekDisplay.js";
import "./WaterLog.css";

const WaterLog = (props) => {
	const [waterOunces, setOunces] = useState("");
	const [waterDate, setDate] = useState("");
	const [waterId, setId] = useState("");

	useEffect(() => {
		if (props.editMode && props.waterData) {
			if (props.waterData.id) {
				setId(props.waterData.id);
			}
			if (props.waterData.ounces) {
				setOunces(props.waterData.ounces);
			}
		}
	}, [props.editMode, props.waterData]);

	const handleOuncesChange = (e) => {
		setOunces(e.target.value);
	};

	const handleDateChange = (e) => {
		setDate(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const ounces = parseInt(waterOunces, 10);

		if (isNaN(ounces)) {
			console.error("Invalid input for ounces.");
			return;
		}

		const waterData = {
			id: waterId,
			ounces: waterOunces,
			date: waterDate,
		};

		console.log("Water Data: ", waterData);

		if (props.editMode) {
			// If in "edit" mode, update the water data
			console.log("UPDATING: ", waterData);
			editWaterLog(waterData);
		} else {
			// Default to POST request
			console.log("ADDING: ", waterData);
			addWaterLog(waterData);
		}
	};

	const addWaterLog = (waterData) => {
		fetch("http://localhost:8080/api/water", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("jwtToken"),
			},
			body: JSON.stringify(waterData),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Data saved: ", data);
				props.handleClose();
			})
			.catch((error) => {
				console.error("Error: ", error);
			});
	};

	const editWaterLog = (waterData) => {
		fetch("http://localhost:8080/api/water", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("jwtToken"),
			},
			body: JSON.stringify(waterData),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Water data updated: ", data);
				props.handleClose(); // close the modal after successful update
			})
			.catch((error) => {
				console.error("Error: ", error);
			});
	};

	return (
		<>
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

export default WaterLog;
