package foo.bar;

import org.springframework.stereotype.Component;

@Component
public class Welcome {

    public String welcome() {
        return "Welcome to Spring Boot";
    }
}
