package andualem.yonas.runners.run;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

// It provides methods to perform CRUD operations on the "runner" table in the database.
@Repository
public class JdbcRunRepository {
    public static final Logger log = LoggerFactory.getLogger(JdbcRunRepository.class);
    private final JdbcClient jdbcClient;

    public JdbcRunRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

// Returns all runs from the database.
    public List <Run> findAll() {
        return jdbcClient.sql("SELECT * FROM runner")
                .query(Run.class)
                .list();
    }
// Runs a query to find a run by its id.
    public Optional<Run> findById(Integer id) {
        return jdbcClient.sql("SELECT id, title, started_on, completed_on, miles, location FROM runner WHERE id = :id")
                .param("id", id)
                .query(Run.class)
                .optional();
    }
// Runs a query to find all runs with a specific location.
    public void create(Run run) {
        var updated = jdbcClient.sql("INSERT INTO runner (id, title, started_on, completed_on, miles, location) VALUES (?, ?, ?, ?, ?, ?)")
                .params(List.of(run.id(), run.title(), run.startedOn(), run.completedOn(), run.miles(), run.location().toString()))
                .update();

        Assert.state(updated == 1, "Failed to insert run" + run.title());
    }
//Updates a run in the database.
    public void update(Run run, Integer id) {
        var updated = jdbcClient.sql("UPDATE runner SET title = ?, started_on = ?, completed_on = ?, miles = ?, location = ? WHERE id = ?")
                .params(List.of(run.title(), run.startedOn(), run.completedOn(), run.miles(), run.location().toString(), id))
                .update();

        Assert.state(updated == 1, "Failed to update run" + run.title());
    }
//Deletes a run from the database.
    public void delete(Integer id) {
        var updated = jdbcClient.sql("DELETE FROM runner WHERE id = ?")
                .param("id", id)
                .update();

        Assert.state(updated == 1, "Failed to delete run" + id);
    }
//Returns the number of runs in the database.
    public int count() {
        return jdbcClient.sql("SELECT * FROM runner")
                .query()
                .listOfRows()
                .size();
    }
//Saves all runs to the database.
    public void saveAll(List<Run> runs) {
        runs.stream().forEach(this::create);
    }
//Finds all runs with a specific location.
    public List <Run> findByLocation(String location) {
        return jdbcClient.sql("SELECT * FROM runner WHERE location = :location")
                .param("location", location)
                .query(Run.class)
                .list();
    }

}
