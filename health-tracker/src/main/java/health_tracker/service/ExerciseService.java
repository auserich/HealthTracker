package health_tracker.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import health_tracker.model.Exercise;
import health_tracker.repository.ExerciseRepository;

@Service
public class ExerciseService {
    @Autowired
    private ExerciseRepository exerciseRepository;

    public List<Exercise> getExercisesByUsername(String username) {
        return exerciseRepository.findByUserUsername(username);
    }
    
    public int getCalorieDay(int userId,String date) {
		Optional<Integer> result = exerciseRepository.getCalorieDay(userId, date);
		
		if(!result.isEmpty()) {
			return result.get();
		} else {
			return 0;
		}
	}
    
    public int getMinuteDay(int userId,String date) {
		Optional<Integer> result = exerciseRepository.getMinuteDay(userId, date);
		
		if(!result.isEmpty()) {
			return result.get();
		} else {
			return 0;
		}
	}
}

