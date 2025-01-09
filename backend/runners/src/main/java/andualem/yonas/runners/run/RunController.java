package andualem.yonas.runners.run;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/runs")
public class RunController {

    private final RunRepository runRepository;

    public RunController(RunRepository runRepository) {
        this.runRepository = runRepository;
    }

    //Get method to return all runs
    @GetMapping()
    List<Run> findAll() {
        return runRepository.findAll();
    }

    //Get method to return a run by id
    @GetMapping("/{id}")
    Run findById(@PathVariable Integer id) {
        Optional<Run> run = runRepository.findById(id);
        if (run.isEmpty()) {
            throw new RunNotFoundException();
        }
        return run.get();
    }

    //Post method to create a new run
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create")
    void create(@Valid @RequestBody Run run) { //Sends 400 Bad request if the request body is not valid
        runRepository.save(run);
    }

    //Put method to update an existing run
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/update/{id}")
    public void update(@Valid @RequestBody Run run, @PathVariable Integer id) {
        if (!runRepository.existsById(id)) {
            throw new RunNotFoundException();
        }
        // Save with versioning handled automatically by Spring Data JDBC
        runRepository.save(run);
    }




    //Delete method to delete a run by id
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Integer id) {
        if (!runRepository.existsById(id)) {
            throw new RunNotFoundException();
        }
        runRepository.deleteById(id);
    }


    //Get method to return all runs by location
    @GetMapping("/location/{location}")
    List<Run> findAllByLocation(@PathVariable String location) {
        return runRepository.findAllByLocation(location);
    }
}
