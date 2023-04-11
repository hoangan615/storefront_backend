/* Replace with your SQL commands */
CREATE TABLE users (
    id SERIAL PRIMARY  KEY,
    firstName VARCHAR(24),
    lastName VARCHAR(24),
    username VARCHAR(32) UNIQUE,
    password VARCHAR
);