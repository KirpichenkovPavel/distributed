CREATE TABLE user_storage(
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  storage_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES "user",
  FOREIGN KEY (storage_id) REFERENCES storage
);