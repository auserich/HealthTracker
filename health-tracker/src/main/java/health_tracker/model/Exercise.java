package health_tracker.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;



@Entity
public class Exercise {

	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;
	
		@NotBlank
	    private String name;
		
		@Positive
	    private int minutes;
		
		@Positive
	    private int caloriesBurned;
		
		
		 @ManyToOne
		    @JoinColumn(name = "user_id") // This is the foreign key in Exercise table
		    private User user;
	    public Exercise() {
	        // Default constructor
	    }

	    public Exercise(Long id, String name, int minutes, int caloriesBurned) {
			super();
			this.id = id;
			this.name = name;
			this.minutes = minutes;
			this.caloriesBurned = caloriesBurned;
		}


		public Long getId() {
			return id;
		}


		public void setId(Long id) {
			this.id = id;
		}


		public String getName() {
			return name;
		}


		public void setName(String name) {
			this.name = name;
		}


		public int getMinutes() {
			return minutes;
		}


		public void setMinutes(int minutes) {
			this.minutes = minutes;
		}


		public int getCaloriesBurned() {
			return caloriesBurned;
		}


		public void setCaloriesBurned(int caloriesBurned) {
			this.caloriesBurned = caloriesBurned;
		}
	    
	    
	    
}
