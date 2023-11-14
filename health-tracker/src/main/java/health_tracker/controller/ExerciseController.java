package health_tracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import health_tracker.exception.ResourceNotFoundException;
import health_tracker.model.Exercise;
import health_tracker.model.Meal;
import health_tracker.model.User;
import health_tracker.service.ExerciseService;
import health_tracker.service.UserService;

@RestController
@RequestMapping("/api")
public class ExerciseController {

    @Autowired
    ExerciseService service;

	@Autowired
    UserService userService;

    @GetMapping("/exercise")
	public List<Exercise> getAllExercises() {
		return service.getAllExercises();
	}
	
	@GetMapping("/exercise/{userId}")
	public ResponseEntity<?> getAllUserExercises(@PathVariable int userId) {
		List<Exercise> found = service.getAllUserExercises(userId);
		return ResponseEntity.status(200).body(found);
	}
	
	@GetMapping("exercise/{userId}/{date}")
	public ResponseEntity<?> getAllUserExercisesFromDate(@PathVariable int userId, @PathVariable String date) {
		List<Exercise> found = service.getAllUserExercisesFromDate(userId, date);
		return ResponseEntity.status(200).body(found);
	}
	
	@PostMapping("/exercise")
	public ResponseEntity<?> createExercise(@RequestBody Exercise exercise) throws ResourceNotFoundException {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User found = userService.getUserByUsername(userDetails.getUsername());

		Exercise created = service.createExercise(exercise, found);
		return ResponseEntity.status(200).body(created);
	}
	
	@PutMapping("/exercise")
	public ResponseEntity<?> updateExercise(@RequestBody Exercise exercise) throws ResourceNotFoundException {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User found = userService.getUserByUsername(userDetails.getUsername());
		
		Exercise updated = service.updateExercise(exercise, found);
		return ResponseEntity.status(200).body(updated);
	}
	
	@DeleteMapping("exercise/{id}")
	public ResponseEntity<?> deleteExercise(@PathVariable int id) throws ResourceNotFoundException {
		Exercise deleted = service.deleteExerciseById(id);
		return ResponseEntity.status(200).body(deleted);
	}
	
	@GetMapping("exercise/calories/{userId}/{date}")
	public ResponseEntity<?> getCaloriesBurnedFromDate(@PathVariable int userId, @PathVariable String date) {
		int found = service.getCaloriesBurnedDay(userId, date);
		return ResponseEntity.status(200).body(found);
	}
}
