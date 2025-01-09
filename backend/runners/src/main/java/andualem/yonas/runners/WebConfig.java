package andualem.yonas.runners;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Sets up CORS (Cross-Origin Resource Sharing) settings for the application.
 * allow requests from http://localhost:5173 with specified HTTP methods.
 */
@Configuration
public class WebConfig {

    /**
     * Defines a bean that customizes the CORS configuration for the application.
     *
     * @return a WebMvcConfigurer that adds CORS mappings to allow requests from specific origins.
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Allow all paths (/**) to be accessed from the specified origin (http://localhost:5173)
                // and allow the specified HTTP methods.
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
            }
        };
    }
}