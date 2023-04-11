/* Replace with your SQL commands */
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(24) NOT NULL,
    lastName VARCHAR(24) NOT NULL,
    username VARCHAR(32) UNIQUE NOT NULL,
    password VARCHAR NOT NULL
);