package health_tracker.service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import health_tracker.exception.ResourceNotFoundException;
import health_tracker.model.User;
import health_tracker.model.WaterLog;
import health_tracker.repository.WaterRepository;

@Service
public class WaterLogService {
	
	@Autowired
	WaterRepository repo;
	
	public List<WaterLog> getUserWaterLogs(int userId) {
		return repo.getUserWaterLogs(userId);
	}
	
	public WaterLog getWaterLogById(int id) throws ResourceNotFoundException {
		Optional<WaterLog> found = repo.findById(id);
		
		if (found.isEmpty()) {
			throw new ResourceNotFoundException("WaterLog", id);
		}
		
		return found.get();
	}
	
	public WaterLog createWaterLog(WaterLog water, User user) {
		water.setId(null);
		
		WaterLog created = new WaterLog(null, water.getOunces(), water.getDate(), user);
		return repo.save(created);
	}
	
	public WaterLog updateWaterLog(WaterLog water) throws ResourceNotFoundException {
		if (repo.existsById(water.getId())) {
			WaterLog updated = repo.save(water);
			return updated;
		}
		
		throw new ResourceNotFoundException("WaterLog", water.getId());
	}
	
	public WaterLog deleteWaterLogById(int id) throws ResourceNotFoundException {
		Optional<WaterLog> found = repo.findById(id);
		
		if (found.isEmpty()) {
			throw new ResourceNotFoundException("WaterLog", id);
		}
		
		repo.deleteById(id);
		return found.get();
	}
}
