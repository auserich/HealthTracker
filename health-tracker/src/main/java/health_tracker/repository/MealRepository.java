package health_tracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import health_tracker.model.Meal;

@Repository
public interface MealRepository extends JpaRepository<Meal, Integer> {
	
	@Query(value = "SELECT * FROM meal WHERE user_id = ?1", nativeQuery = true)
	public List<Meal> getAllUserMeals(int userId);
}
