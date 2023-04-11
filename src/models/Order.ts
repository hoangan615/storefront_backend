import Client from '../database/Client';
import { OrderProduct } from './OrderProduct';

export type Order = {
  id: number | undefined | null;
  items: OrderProduct[];
  userId: string;
  status: 'active' | 'completed';
};

export class OrderStore {
  async index(userId: string, status: string): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      let sql = 'SELECT * FROM orders where userId=($1)';
      const params = [userId];
      if (['active', 'completed'].includes(status)) {
        sql += ' AND status=($2)';
        params.push(status);
      }
      console.log('sql: ' + sql);

      const result = await conn.query(sql, params);
      const orderProductSql = 'SELECT * FROM order_products WHERE orderId=($1)';
      for (const order of result.rows) {
        const orderItems = await conn.query(orderProductSql, [order.id]);
        order.items = orderItems.rows;
      }

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get Order. Error: ${err}`);
    }
  }

  async show(userId: string, orderId: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1) and userId=($2)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [orderId, userId]);
      const orderProductSql = 'SELECT * FROM order_products WHERE orderId=($1)';

      if (result.rows.length > 0) {
        const orderItems = await conn.query(orderProductSql, [
          result.rows[0].id,
        ]);
        result.rows[0].items = orderItems.rows;
      }
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find Order ${orderId}. Error: ${err}`);
    }
  }

  async create(b: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (userId, status) VALUES($1, $2) RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [b.userId, b.status]);

      const data = result.rows[0];

      if (b.items?.length > 0) {
        const sql =
          'INSERT INTO order_products (quantity, orderId, productId) VALUES($1, $2, $3) RETURNING *';
        for (const item of b.items) {
          await conn.query(sql, [item.quantity, data.id, item.productId]);
        }
      }

      conn.release();

      return data;
    } catch (err) {
      throw new Error(`Could not add new Order. Error: ${err}`);
    }
  }

  async delete(userId: string, orderId: string): Promise<Order> {
    try {
      const conn = await Client.connect();

      const sql = 'DELETE FROM orders WHERE id=($1) AND userId=($2)';
      const deleteItemsSql = 'DELETE FROM order_products WHERE orderId=($1)';

      await conn.query(deleteItemsSql, [orderId]);
      const result = await conn.query(sql, [orderId, userId]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete Order ${orderId}. Error: ${err}`);
    }
  }

  async addProduct(
    userId: string,
    orderId: string,
    productId: string,
    quantity: number
  ): Promise<Order> {
    // get order to see if it is open
    try {
      const ordersql = 'SELECT * FROM orders WHERE id=($1) AND userId=($2)';
      const conn = await Client.connect();

      const result = await conn.query(ordersql, [orderId, userId]);

      const order = result.rows[0];

      if (order.status !== 'Active') {
        throw new Error(
          `1. Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
        );
      }

      conn.release();
    } catch (err) {
      throw new Error(`${err}`);
    }

    try {
      const conn = await Client.connect();
      const checkItemSql =
        'SELECT * FROM order_products WHERE orderId=($1) AND productId=($2)';
      const itemsResult = await conn.query(checkItemSql, [productId, orderId]);
      const existItem = itemsResult.rows[0];
      console.log('itemsResult', itemsResult);

      if (!existItem) {
        const sql =
          'INSERT INTO order_products (quantity, orderId, productId) VALUES($1, $2, $3) RETURNING *';

        const result = await conn.query(sql, [quantity, orderId, productId]);

        const order = result.rows[0];

        conn.release();

        return order;
      } else {
        const sql =
          'UPDATE order_products SET quantity=($1) WHERE productId=($2) AND orderId=($3) RETURNING *';

        const newQuantity = quantity + existItem.quantity;
        console.log('quantity + existItem.quantity', newQuantity);

        const result = await conn.query(sql, [newQuantity, orderId, productId]);

        const order = result.rows[0];

        conn.release();

        return order;
      }
    } catch (err) {
      throw new Error(
        `2. Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }

  async completeOrder(userId: string, orderId: string): Promise<Order> {
    // get order to see if it is open
    try {
      const ordersql = 'SELECT * FROM orders WHERE id=($1) AND userId=($2)';
      const conn = await Client.connect();

      const result = await conn.query(ordersql, [orderId, userId]);

      const order = result.rows[0];
      if (!order) {
        throw new Error(`Cannot find Order ${orderId}`);
      }
      if (order.status !== 'Active') {
        throw new Error(`Cannot complete Order ${orderId}`);
      }

      conn.release();
    } catch (err) {
      throw new Error(`${err}`);
    }

    try {
      const status = 'completed';
      const sql = 'UPDATE orders SET status=($1) WHERE id=($2) AND userId=($3)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [status, orderId, userId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Cannot complete Order ${orderId}: ${err}`);
    }
  }
}
