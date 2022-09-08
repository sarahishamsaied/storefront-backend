import Client from '../../Database/database';
export type Order = {
  id: number;
  user_id: number;
  status: Status;
};
export enum Status {
  ACTIVE = 'ACTIVE',
  COMPLETE = 'COMPLETE',
}
export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM orders';
      const response = await connection.query(sql);
      return response.rows;
    } catch (error) {
      console.log(error);
      throw new Error('Cannot get orders');
    }
  }
  async show(id: string): Promise<Order> {
    try {
      const connection = await Client.connect();
      const sql = `SELECT * FROM orders where id = ${id}`;
      const response = await connection.query(sql);
      return response.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error('Cannot get order');
    }
  }
  async addProduct(
    order_id: string,
    quantity: number,
    product_id: string
  ): Promise<void> {
    try {
      const connection = await Client.connect();
      const sql = `INSERT INTO order_product (quantity,order_id,product_id) VALUES (${quantity}, ${order_id} , ${product_id})`;
      const response = await connection.query(sql);
      const order = response.rows[0];
      console.log(order);
    } catch (error) {
      console.log(error);
    }
  }
  async create(user_id: string, status: Status): Promise<void> {
    try {
      console.log(status);
      const connection = await Client.connect();
      const sql = `INSERT INTO orders (user_id,status) VALUES (${user_id}, '${Status.ACTIVE}')`;
      const response = await connection.query(sql);
      const order = response.rows[0];
      console.log(order);
    } catch (error) {
      console.log(error);
      throw new Error('Cannot add order');
    }
  }
}
