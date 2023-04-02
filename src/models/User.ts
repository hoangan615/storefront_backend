import client from '../db/client';

export type User = {
  id: number;
  title: string;
  author: string;
  totalPages: number;
  summary: string;
};

export class Users {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get Users. Error: ${err}`);
    }
  }

  // async create(b: Book): Promise<Book> {
  //   try {
  //     const sql =
  //       'INSERT INTO books (title, author, total_pages, summary) VALUES($1, $2, $3, $4) RETURNING *';
  //     // @ts-ignore
  //     const conn = await Client.connect();

  //     const result = await conn.query(sql, [
  //       b.title,
  //       b.author,
  //       b.totalPages,
  //       b.summary,
  //     ]);

  //     const book = result.rows[0];

  //     conn.release();

  //     return book;
  //   } catch (err) {
  //     throw new Error(`Could not add new book ${title}. Error: ${err}`);
  //   }
  // }

  async get(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find User ${id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete User ${id}. Error: ${err}`);
    }
  }
}
