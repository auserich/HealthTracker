package health_tracker.service;

import java.util.List;

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
}

