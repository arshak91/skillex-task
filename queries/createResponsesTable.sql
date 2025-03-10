-- Table for responses
CREATE TABLE IF NOT EXISTS combinations_db.responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    response JSON NOT NULL
);