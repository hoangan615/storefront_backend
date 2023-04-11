/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    status VARCHAR(15),
    userId bigint REFERENCES users(id)
);