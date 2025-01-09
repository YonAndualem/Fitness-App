package andualem.yonas.runners.run;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.asm.TypeReference;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;

@Component
public class RunJsonDataLoader implements CommandLineRunner {
    private static final Logger log = LoggerFactory.getLogger(RunJsonDataLoader.class);

    private final JdbcRunRepository jdbcRunRepository;
    private final ObjectMapper objectMapper;
    public RunJsonDataLoader(JdbcRunRepository jdbcRunRepository, ObjectMapper objectMapper) {
        this.jdbcRunRepository = jdbcRunRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        if (jdbcRunRepository.count() == 0) {
            try (InputStream inputStream = TypeReference.class.getResourceAsStream("/data/runs.json")) {
                Runs allRuns = objectMapper.readValue(inputStream, Runs.class);
                log.info("Reading {} runs from JSON file", allRuns.runs().size());
                jdbcRunRepository.saveAll(allRuns.runs());
            } catch (IOException e) {
                log.error("Failed to load runs from JSON file", e);
            }
        }
        else{
                log.info("Not loading runs from JSON file as there are already runs in the database");
            }
        }
    }

