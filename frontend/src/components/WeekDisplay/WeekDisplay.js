import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import "./WeekDisplay.css";

const WeekDisplay = ({ selectedDate }) => {
	const days = [];
	const currentDate = new Date(selectedDate);
	const firstDayOfWeek = new Date(currentDate);
	const lastDayOfWeek = new Date(currentDate);

	firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Get the first day (Sunday) of the selected week
	lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6); // Get the last day (Saturday) of the selected week

	for (let i = 0; i < 7; i++) {
		const day = new Date(firstDayOfWeek);
		day.setDate(firstDayOfWeek.getDate() + i);

		// const dayName = day.toLocaleString("en-US", { weekday: "long" });
		// const dayDate = day.getDate();
		const options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		const formattedDate = day.toLocaleDateString("en-US", options);

		days.push(
			<Col key={i}>
				<Card className="day">
					<Card.Body>
						{/* <Card.Title className="day-name">{dayName}</Card.Title>
						<Card.Text className="day-date">{dayDate}</Card.Text> */}
						<Card.Title className="day-name">
							{formattedDate}
						</Card.Title>
					</Card.Body>
				</Card>
			</Col>
		);
	}

	return (
		<Card>
			<Row>{days}</Row>
		</Card>
	);
};

export default WeekDisplay;
