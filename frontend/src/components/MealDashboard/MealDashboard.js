import Meal from "../Meal/Meal";
import MealWeekDisplay from "../MealWeekDisplay/MealWeekDisplay";

function MealDashboard() {
	return (
		<>
			<h3>Meal Dashboard</h3>
			<MealWeekDisplay />
			<Meal />
		</>
	);
}

export default MealDashboard;
