package health_tracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import health_tracker.model.User;
import health_tracker.repository.UserRepository;

@RestController
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	UserRepository repo;
	
	@Autowired
	PasswordEncoder encoder;
	
	@PostMapping("/user")
	public ResponseEntity<?> createUser(@RequestBody User user) {
		
		user.setId(null);
		
		user.setPassword(encoder.encode(user.getPassword()));
		
		User created = repo.save(user);
		
		return ResponseEntity.status(201).body(created);
	}
}
