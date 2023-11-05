import { useNavigate } from "react-router-dom";
import Meal from "../Meal/Meal";
import MealWeekDisplay from "../MealWeekDisplay/MealWeekDisplay";
import { Button } from "react-bootstrap";

const MealDashboard = () => {
	const navigate = useNavigate();

	const handleNavigateToMain = () => {
		navigate("/main");
	};

	return (
		<>
			<h3>Meal Dashboard</h3>
			<MealWeekDisplay />
			<Button onClick={handleNavigateToMain}>Back To Dashboard</Button>
		</>
	);
};

export default MealDashboard;
