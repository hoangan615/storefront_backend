/* Replace with your SQL commands */
CREATE TABLE order_products ( 
    id SERIAL PRIMARY KEY, 
    quantity integer NOT NULL, 
    orderId bigint REFERENCES orders(id), 
    productId bigint REFERENCES products(id) 
);