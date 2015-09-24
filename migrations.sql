psql

CREATE DATABASE people_db;
\c people_db

CREATE TABLE people (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255)
);
