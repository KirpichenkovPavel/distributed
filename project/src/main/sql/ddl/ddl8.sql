CREATE TABLE "payment_status" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) UNIQUE NOT NULL
);

INSERT INTO payment_status (name) VALUES
  ('new'),
  ('done'),
  ('cancelled')
;

ALTER TABLE payment ADD COLUMN status_id INTEGER REFERENCES payment_status;
ALTER TABLE payment DROP COLUMN status;
ALTER TABLE payment ALTER COLUMN status_id SET NOT NULL;
