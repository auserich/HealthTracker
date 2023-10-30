package health_tracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import health_tracker.model.Exercise;
import health_tracker.repository.ExerciseRepository;

@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {
	@Autowired
    private ExerciseRepository exerciseRepository;

    @PostMapping
    public Exercise createExercise(@RequestBody Exercise exercise) {
        return exerciseRepository.save(exercise);
    }

    @GetMapping
    public Iterable<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }
}
