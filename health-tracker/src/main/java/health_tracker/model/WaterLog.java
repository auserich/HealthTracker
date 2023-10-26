package health_tracker.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class WaterLog {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "ounces", nullable = false)
	private Integer ounces;
	
	//@Column(nullable = false)
	private Date date;
	
	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private User user;
	
	public WaterLog() {
		super();
	}

	public WaterLog(Integer id, Integer ounces, Date date) {
		super();
		this.id = id;
		this.ounces = ounces;
		this.date = date;
	}

	public Integer getId() { return id; } 
	public void setId(Integer id) { this.id = id; } 

	public Integer getOunces() { return ounces; } 
	public void setOunces(Integer waterLogOunces) { this.ounces = waterLogOunces; } 

	public Date getDate() { return date; } 
	public void setDate(Date date) { this.date = date; }

	@Override
	public String toString() {
		return "WaterLog [id=" + id + ", ounces=" + ounces + ", date=" + date + ", user=" + user + "]";
	} 

	
}
