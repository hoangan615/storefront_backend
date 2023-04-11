# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Admins

- Index [token required]: GET /admins
- Show [token required]: GET /admins/:id
- Create [token required]: POST /admins
- Login [provide username, password]: POST /admins/login

#### Products

- Index: GET /products
- Show: GET /products/:id
- Create [token required]: POST /products
- Delete [token required]: DELETE /products/:id

#### Users

- Index [token required]: GET /users
- Show [token required]: GET /users/:id
- Create [token required]: POST /users
- Delete [token required]: DELETE /users/:id

#### Orders

- Create Order by user (args: user id)[token required]: POST /users/:userId/orders
- Add Product to Order by user (args: user id, order id)[token required]: POST /users/:userId/orders/:id
- Complete the Order by user (args: user id, order id)[token required]: POST /users/:userId/orders/:id/complete
- Get Orders by user & orderId (args: user id, order id)[token required]: GET: /users/:userId/orders/:id
- Delete Orders by user & orderId (args: user id, order id)[token required]: DELETE: /users/:userId/orders/:id
- All Orders by user (args: user id, order id)[token required]: GET: /users/:userId/orders
- Current Orders by user (active status) (args: user id)[token required]: GET: /users/:userId/orders?status=active
- Completed Orders by user(completed status) (args: user id)[token required] GET: /users/:userId/orders?status=completed

## Data Shapes

#### Admin

```
id SERIAL PRIMARY KEY,
username VARCHAR(32) UNIQUE,
password VARCHAR
```

#### User

```
id SERIAL PRIMARY KEY,
firstName VARCHAR(24),
lastName VARCHAR(24),
username VARCHAR(32) UNIQUE,
password VARCHAR
```

#### Product

```
id SERIAL PRIMARY KEY,
name VARCHAR(64) NOT NULL,
price Integer NOT NULL,
category VARCHAR(64)
```

#### Order

```
id SERIAL PRIMARY KEY,
status VARCHAR(15),
userId bigint REFERENCES users(id)
```

#### Order_Product

```
id SERIAL PRIMARY KEY,
quantity integer,
orderId bigint REFERENCES orders(id),
productId bigint REFERENCES products(id)
```
