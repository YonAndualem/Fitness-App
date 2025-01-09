package andualem.yonas.runners.user;

import org.springframework.data.relational.core.sql.In;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.service.annotation.GetExchange;

import java.util.List;

public interface UserHttpClient {

    @GetExchange("/users")
    List<User> findAll();
    @GetExchange("/users/{id}")
    User findById(@PathVariable Integer id);
}
