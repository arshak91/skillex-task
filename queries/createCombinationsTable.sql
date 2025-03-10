-- Table for combinations
CREATE TABLE IF NOT EXISTS combinations_db.combinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  combination JSON NOT NULL,
  itemId INT,
  CONSTRAINT fk_item FOREIGN KEY (itemId) REFERENCES combinations_db.items(id) ON DELETE CASCADE
);
