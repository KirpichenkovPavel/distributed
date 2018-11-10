CREATE TABLE pc_item(
  id SERIAL PRIMARY KEY,
  component_id INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  price INTEGER NULL,
  FOREIGN KEY (component_id) REFERENCES component
);

CREATE TABLE "user"(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE role(
  id SERIAL PRIMARY KEY,
  name VARCHAR(32) NOT NULL UNIQUE
);

CREATE TABLE user_role(
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  role_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES "user",
  FOREIGN KEY (role_id) REFERENCES role
);

CREATE TABLE payment(
  id SERIAL PRIMARY KEY,
  from_id INTEGER NOT NULL,
  to_id INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  status VARCHAR(32),
  FOREIGN KEY (from_id) REFERENCES "user",
  FOREIGN KEY (to_id) REFERENCES "user"
);

CREATE TABLE "order"(
  id SERIAL PRIMARY KEY,
  status VARCHAR(32),
  from_id INTEGER NOT NULL,
  to_id INTEGER NULL,
  payment_id INTEGER NULL,
  FOREIGN KEY (from_id) REFERENCES "user",
  FOREIGN KEY (to_id) REFERENCES "user",
  FOREIGN KEY (payment_id) REFERENCES payment
);

CREATE TABLE order_items(
  id SERIAL PRIMARY KEY,
  order_id INTEGER,
  item_id INTEGER,
  FOREIGN KEY (order_id) REFERENCES "order",
  FOREIGN KEY (item_id) REFERENCES item
);

CREATE TABLE storage(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE
);

CREATE TABLE provider(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE
);

CREATE TABLE storage_items(
  id SERIAL PRIMARY KEY,
  storage_id INTEGER NOT NULL ,
  item_id INTEGER NOT NULL ,
  FOREIGN KEY (storage_id) REFERENCES storage,
  FOREIGN KEY (item_id) REFERENCES item
);

CREATE TABLE provider_items(
  id SERIAL PRIMARY KEY,
  provider_id INTEGER NOT NULL,
  item_id INTEGER NOT NULL
);