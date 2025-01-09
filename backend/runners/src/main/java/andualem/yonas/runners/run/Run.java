package andualem.yonas.runners.run;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Version;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Table("runner")
public record Run(
        @Id
        Integer id,
        @NotEmpty
        String title,
        LocalDateTime startedOn,
        LocalDateTime completedOn,
        @Positive //Validation
        Integer miles,
        Location location,
        @Version
        Integer version
)
{
    //Custom constraint for validating input
    public Run {
        if (!completedOn.isAfter(startedOn)) {
            throw new IllegalArgumentException("Run must be completed after it has started");
        }
    }
}
