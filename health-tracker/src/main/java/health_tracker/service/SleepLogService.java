package health_tracker.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import health_tracker.exception.ResourceNotFoundException;
import health_tracker.model.User;
import health_tracker.model.SleepLog;
import health_tracker.repository.SleepRepository;

@Service
public class SleepLogService {
	@Autowired
	SleepRepository repo;
	
	public List<SleepLog> getAllUserSleepLogs(int userId, String currentDate) {
		
		// Parse the currentDate string into a Date object
        System.out.println("currentDate: " + currentDate);
        //currentDate = "2023-10-28";
        List<SleepLog> sleepLogs = repo.getAllUserSleepLogs(currentDate, userId);
        System.out.println(sleepLogs);
        return sleepLogs;
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
	
	public List<SleepLog> getUserSleepLogs(int userId) {
		return repo.getUserSleepLogs(userId);
	}
	
	public SleepLog getSleepLogById(int id) throws ResourceNotFoundException {
		Optional<SleepLog> found = repo.findById(id);
		
		if (found.isEmpty()) {
			throw new ResourceNotFoundException("SleepLog", id);
		}
		
		return found.get();
	}
	
	public SleepLog createSleepLog(SleepLog sleep, User user) {
		sleep.setId(null);
		
		SleepLog created = new SleepLog(null, sleep.getMinutes(), sleep.getDate(), user);
		return repo.save(created);
	}
	// is this necessary instead of just enforcing deletion and recreation
	public SleepLog updateSleepLog(SleepLog sleep) throws ResourceNotFoundException {
		if (repo.existsById(sleep.getId())) {
			SleepLog updated = repo.save(sleep);
			return updated;
		}
		
		throw new ResourceNotFoundException("SleepLog", sleep.getId());
	}
	
	public SleepLog deleteSleepLogById(int id) throws ResourceNotFoundException {
		Optional<SleepLog> found = repo.findById(id);
		
		if (found.isEmpty()) {
			throw new ResourceNotFoundException("SleepLog", id);
		}
		
		repo.deleteById(id);
		return found.get();
	}

}
