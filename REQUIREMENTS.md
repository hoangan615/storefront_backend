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

- Top 5 most popular products: GET /products/top
- Products by category (args: product category): GET /products?category="text"

#### Users

- Index [token required]: GET /users
- Show [token required]: GET /users/:id
- Create [token required]: POST /users
- Delete [token required]: DELETE /users/:id

#### Orders

- Create Order by user (args: user id)[token required]: POST /user/:userId/orders
- Add Product to Order by user (args: user id, order id)[token required]: POST /user/:userId/orders/:id
- Complete the Order by user (args: user id, order id)[token required]: POST /user/:userId/orders/:id/complete
- Current Orders by user (args: user id)[token required]: GET: /users/:userId/orders
- Completed Orders by user (args: user id)[token required] GET: /users/:userId/orders?status=complete

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
