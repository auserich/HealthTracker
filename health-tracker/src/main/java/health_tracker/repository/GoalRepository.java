package health_tracker.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import health_tracker.model.Goal;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Integer> {

	@Query(value = "SELECT * FROM goal WHERE user_id = ?1", nativeQuery = true)
	public Optional<Goal> findByUserId(int userId);
}
