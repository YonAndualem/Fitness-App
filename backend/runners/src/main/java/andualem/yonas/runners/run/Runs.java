package andualem.yonas.runners.run;

import java.util.List;

/**
 * This class represents a collection of Run objects. By using Java's record feature to define an immutable data structure.
 * The `runs` field holds a list of Run objects.
 */
public record Runs(List<Run> runs) {
    public Runs {
    }
}
