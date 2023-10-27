package health_tracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import health_tracker.model.WaterLog;

@Repository
public interface WaterRepository extends JpaRepository<WaterLog, Integer> {
	
	@Query(value = "SELECT * FROM water_log WHERE user_id = ?1", nativeQuery = true)
	public List<WaterLog> getUserWaterLogs(int userId);
}
