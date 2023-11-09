package health_tracker.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Entity
public class Exercise implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Integer id;
	
	@NotBlank
	private String name;
		
	@Positive
	private int minutes;
		
	@Positive
	private int caloriesBurned;
		
		
	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id") // This is the foreign key in Exercise table
	private User user;
	
	public Exercise() {
		super();
	}

	public Exercise(Integer id, @NotBlank String name, @Positive int minutes, @Positive int caloriesBurned, User user) {
		super();
		this.id = id;
		this.name = name;
		this.minutes = minutes;
		this.caloriesBurned = caloriesBurned;
		this.user = user;
	}

	public Integer getId() { return id; } 
	public void setId(Integer id) { this.id = id; } 

	public String getName() { return name; } 
	public void setName(String name) { this.name = name; } 

	public int getMinutes() { return minutes; } 
	public void setMinutes(int minutes) { this.minutes = minutes; } 

	public int getCaloriesBurned() { return caloriesBurned; } 
	public void setCaloriesBurned(int caloriesBurned) { this.caloriesBurned = caloriesBurned; } 

	public User getUser() { return user; } 
	public void setUser(User user) { this.user = user; } 

}
