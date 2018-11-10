alter table item add column storage_id integer references storage;
drop table storage_items;