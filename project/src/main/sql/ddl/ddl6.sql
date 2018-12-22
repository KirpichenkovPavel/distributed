CREATE TABLE "order_status"(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO "order_status" ("name") VALUES
  ('new'),
  ('submitted'),
  ('approved'),
  ('paid'),
  ('complete'),
  ('closed'),
  ('cancelled');

ALTER TABLE "order" drop column "status";
ALTER TABLE "order" add column "status_id" INTEGER REFERENCES order_status;
UPDATE "order" as o
SET status_id = (
  SELECT os."id"
  FROM "order_status" as os
  WHERE os."name" = 'new'
)
WHERE o.status_id is NULL;
ALTER TABLE "order" ALTER COLUMN "status_id" SET NOT NULL;

ALTER TABLE item ADD COLUMN order_id INTEGER REFERENCES "order" NULL;
ALTER TABLE "order" ADD COLUMN storage_id INTEGER REFERENCES "storage" NULL;
DROP TABLE order_items;
