package health_tracker.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import health_tracker.model.Exercise;


	@Repository
	public interface ExerciseRepository extends JpaRepository<Exercise, Integer> {
	    List<Exercise> findByUserUsername(String username);
	    
	    @Query(value = "SELECT SUM(calories_burned) as dayCalories FROM exercise WHERE user_id = ?1 AND date = ?2", nativeQuery = true)
		public Optional<Integer> getCalorieDay(int userId, String date);
	    
	    @Query(value = "SELECT SUM(minutes) as dayMinutes FROM exercise WHERE user_id = ?1 AND date = ?2", nativeQuery = true)
		public Optional<Integer> getMinuteDay(int userId, String date);
	}


