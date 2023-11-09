import React, { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Button, Card, Col, ListGroup, Modal, Row } from "react-bootstrap";
import userImage from "../../assets/user.png";
import "./Profile.css";
import EditProfile from "./EditProfile";

const Profile = () => {
	const [userInfo, setUserInfo] = useState(null);
	const [userId, setUserId] = useState(null);
	const [goalInfo, setGoalInfo] = useState(null);
	const [showEditGoalData, setShowEditGoalData] = useState(false);

	useEffect(() => {
		fetchUserInfo();
	}, []);

	useEffect(() => {
		if (userId) {
			fetchGoalInfo();
		}
	}, [userId]);

	const toggleEditGoal = () => {
		setShowEditGoalData(!showEditGoalData);
		fetchGoalInfo();
	};

	const fetchUserInfo = () => {
		// Make a request to your "whoami" endpoint to get the user's ID
		fetch("http://localhost:8080/api/user/whoami", {
			method: "GET",
			headers: {
				Authorization: "Bearer " + localStorage.getItem("jwtToken"),
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setUserInfo(data); // store user info
				setUserId(data.id);
				console.log("User Info: ", data);
			})
			.catch((error) => {
				console.error("Error fetching user data:", error);
			});
	};

	const fetchGoalInfo = () => {
		fetch(`http://localhost:8080/api/goal/${userId}`, {
			method: "GET",
			headers: {
				Authorization: "Bearer " + localStorage.getItem("jwtToken"),
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setGoalInfo(data); // store user's goal info
				console.log("Goal Info: ", data);
			})
			.catch((error) => {
				console.error("Error fetching user data:", error);
			});
	};

	return (
		<>
			<Navbar></Navbar>
			<Card style={{ width: "30rem" }} className="mx-auto mt-5 p-5">
				<Card.Img
					variant="top"
					src={userImage}
					className="profile-image mx-auto"
				/>
				<Card.Body>
					<Card.Title>{localStorage.getItem("username")}</Card.Title>
					{userInfo ? ( // Check if userInfo is not null before rendering email
						<Card.Text>{userInfo.email}</Card.Text>
					) : (
						<Card.Text>Loading...</Card.Text>
					)}
				</Card.Body>
				<ListGroup className="list-group-flush">
					<ListGroup.Item>
						<Row>
							<Col>
								<span style={{ fontWeight: "bold" }}>
									Meal Goal:
								</span>
							</Col>
							{goalInfo ? ( // Check if userInfo is not null before rendering email
								<Col>{goalInfo.mealGoal}</Col>
							) : (
								<Col>Loading...</Col>
							)}
						</Row>
					</ListGroup.Item>
					<ListGroup.Item>
						<Row>
							<Col>
								<span style={{ fontWeight: "bold" }}>
									Exercise Goal:
								</span>
							</Col>
							{goalInfo ? ( // Check if userInfo is not null before rendering email
								<Col>{goalInfo.exerciseGoal}</Col>
							) : (
								<Col>Loading...</Col>
							)}
						</Row>
					</ListGroup.Item>
					<ListGroup.Item>
						<Row>
							<Col>
								<span style={{ fontWeight: "bold" }}>
									Water Goal:
								</span>
							</Col>
							{goalInfo ? ( // Check if userInfo is not null before rendering email
								<Col>{goalInfo.waterGoal}</Col>
							) : (
								<Col>Loading...</Col>
							)}
						</Row>
					</ListGroup.Item>
					<ListGroup.Item>
						<Row>
							<Col>
								<span style={{ fontWeight: "bold" }}>
									Sleep Goal:
								</span>
							</Col>
							{goalInfo ? ( // Check if userInfo is not null before rendering email
								<Col>{goalInfo.sleepGoal}</Col>
							) : (
								<Col>Loading...</Col>
							)}
						</Row>
					</ListGroup.Item>
				</ListGroup>
				<Card.Body>
					Weekly Goals
					<Button className="ms-2" onClick={toggleEditGoal}>
						Edit
					</Button>
				</Card.Body>
			</Card>

			<Modal
				show={showEditGoalData}
				onHide={() => setShowEditGoalData(false)}
				backdrop="static"
			>
				<Modal.Header closeButton>
					<Modal.Title>Edit Goals</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{showEditGoalData && (
						<EditProfile
							goalInfo={goalInfo}
							handleClose={toggleEditGoal}
						/>
					)}
				</Modal.Body>
			</Modal>
		</>
	);
};

export default Profile;
