package health_tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import health_tracker.model.WaterLog;

@Repository
public interface WaterRepository extends JpaRepository<WaterLog, Integer> {
}
