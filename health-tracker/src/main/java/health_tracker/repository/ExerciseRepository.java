package health_tracker.repository;

import org.springframework.data.repository.CrudRepository;

import health_tracker.model.Exercise;

public interface ExerciseRepository extends CrudRepository<Exercise, Long>{

}
