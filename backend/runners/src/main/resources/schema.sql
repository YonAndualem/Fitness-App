CREATE TABLE IF NOT EXISTS runner (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    started_on TIMESTAMP NOT NULL,
    completed_on TIMESTAMP NOT NULL,
    miles INT NOT NULL CHECK (miles > 0),
    location VARCHAR(255) NOT NULL,
    version INT DEFAULT 0
);
