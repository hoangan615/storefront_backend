/* Replace with your SQL commands */
CREATE TABLE admins (
    id SERIAL PRIMARY  KEY,
    username VARCHAR(32) UNIQUE,
    password VARCHAR
);

INSERT INTO admins(username, password) VALUES('admin', '$2b$10$/eek3mgKcQTcAVIQZsSJfOibMhtPaRip2AT8VGZIVMlaCK8KHn5eC');