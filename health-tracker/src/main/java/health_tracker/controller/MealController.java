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
import health_tracker.model.Meal;
import health_tracker.model.User;
import health_tracker.service.MealService;
import health_tracker.service.UserService;

@RestController
@RequestMapping("/api")
public class MealController {

	@Autowired
	MealService service;
	
	@Autowired
	UserService userService;
	
	@GetMapping("/meal")
	public List<Meal> getAllMeals() {
		return service.getAllMeals();
	}
	
	@GetMapping("/meal/{userId}")
	public ResponseEntity<?> getAllUserMeals(@PathVariable int userId) {
		List<Meal> found = service.getAllUserMeals(userId);
		return ResponseEntity.status(200).body(found);
	}
	
	@PostMapping("/meal")
	public ResponseEntity<?> createMeal(@RequestBody Meal meal) throws ResourceNotFoundException {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String username = userDetails.getUsername();
		User found = userService.getUserByUsername(username);
		
		Meal created = service.createMeal(meal, found);
		return ResponseEntity.status(200).body(created);
	}
	
	@PutMapping("/meal")
	public ResponseEntity<?> updateMeal(@RequestBody Meal meal) throws ResourceNotFoundException {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String username = userDetails.getUsername();
		User found = userService.getUserByUsername(username);
		
		Meal updated = service.updateMeal(meal, found);
		return ResponseEntity.status(200).body(updated);
	}
	
	@DeleteMapping("meal/{id}")
	public ResponseEntity<?> deleteMeal(@PathVariable int id) throws ResourceNotFoundException {
		Meal deleted = service.deleteMealById(id);
		return ResponseEntity.status(200).body(deleted);
	}
}
