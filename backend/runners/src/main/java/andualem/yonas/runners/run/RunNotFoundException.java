package andualem.yonas.runners.run;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Defines a custom exception for handling cases where a Run entity is not found.
 * It sets the HTTP response status to 404 (Not Found) when this exception is thrown.
 */
@ResponseStatus (HttpStatus.NOT_FOUND)
public class RunNotFoundException extends RuntimeException {
    public RunNotFoundException() {
        super("Run not found");
    }
}
