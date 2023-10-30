package health_tracker.service;

import java.text.SimpleDateFormat;
import java.util.Date;
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
	
	public List<WaterLog> getAllUserWaterLogs(int userId, String currentDate) {
//		SimpleDateFormat sm = new SimpleDateFormat("MM-dd-yyyy");
//		String strDate = sm.format(currentDate);
//		return repo.getAllUserWaterLogs(strDate, userId);
		
		// Parse the currentDate string into a Date object
        System.out.println("currentDate: " + currentDate);
        //currentDate = "2023-10-28";
        List<WaterLog> waterLogs = repo.getAllUserWaterLogs(currentDate, userId);
        System.out.println(waterLogs);
        return waterLogs;
	}
	
	private Date parseDateStringToDate(String dateString) {
        // Implement a method to parse the date string into a Date object
        // You can use SimpleDateFormat or another method to achieve this
        // Example using SimpleDateFormat:
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            return sdf.parse(dateString);
        } catch (Exception e) {
            // Handle parsing errors
            e.printStackTrace();
            return null;
        }
    }
	
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
