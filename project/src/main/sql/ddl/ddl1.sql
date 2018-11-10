CREATE TABLE pc_component(
  id serial primary key,
  name varchar(100) not null unique,
  description varchar(1000) null
);