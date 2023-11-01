package health_tracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import health_tracker.model.Exercise;
import health_tracker.repository.ExerciseRepository;
import health_tracker.service.ExerciseService;


@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {
    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private ExerciseService exerciseService;

    // Endpoint to create an exercise
    @PostMapping
    public Exercise createExercise(@RequestBody Exercise exercise) {
        return exerciseRepository.save(exercise);
    }

    // Endpoint to get user-specific exercises
    @GetMapping("/user-exercises")
    public List<Exercise> getUserExercises(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        return exerciseService.getExercisesByUsername(username);
    }
}
