package health_tracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import health_tracker.model.Exercise;


	@Repository
	public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
	    List<Exercise> findByUserUsername(String username);
	}


