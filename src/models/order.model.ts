import Client from '../../Database/database';
export interface BaseOrder {
  user_id: number;
  status: Status;
}
export interface Order extends BaseOrder {
  id: number;
  user_id: number;
  status: Status;
}
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
      throw new Error('Cannot get orders');
    }
  }
  async show(id: string): Promise<Order> {
    let errorMessage = 'Cannot get order';
    try {
      const connection = await Client.connect();
      const sql = `SELECT * FROM orders where id = ${id}`;
      const response = await connection.query(sql);
      if (response.rows.length === 0) {
        errorMessage = `Cannot find order with id = ${id}`;
        throw new Error(errorMessage);
      } else return response.rows[0];
    } catch (error) {
      throw new Error(errorMessage);
    }
  }
  async completeOrder(id: string): Promise<BaseOrder> {
    let errorMessage = 'Cannot complete order';
    try {
      const connection = await Client.connect();
      const sql = `UPDATE orders SET status = 'COMPLETE' where id = ${id} RETURNING *`;
      const response = await connection.query(sql);
      console.log(response);
      if (response.rowCount === 0) {
        errorMessage = `Cannot find order with id = ${id}`;
        throw new Error(errorMessage);
      }
      return response.rows[0];
    } catch (error) {
      throw new Error(errorMessage);
    }
  }
  async updateUserId(uid: number, id: number): Promise<BaseOrder> {
    try {
      const connection = await Client.connect();
      const sql = `UPDATE orders SET user_id = ${uid} where id = ${id} RETURNING *`;
      const response = await connection.query(sql);
      connection.release();
      return response.rows[0];
    } catch (error) {
      throw new Error('Cannot update order');
    }
  }
  async showUserOrders(uid: number): Promise<Order[]> {
    let errorMessage = 'Cannot show orders';
    try {
      const connection = await Client.connect();
      const sql = `SELECT * FROM orders where user_id = ${uid}`;
      const orders = await connection.query(sql);
      if (orders.rowCount === 0) {
        errorMessage = `Cannot find order with user id = ${uid}`;
        throw new Error(errorMessage);
      }
      return orders.rows;
    } catch (error) {
      throw new Error(errorMessage);
    }
  }
  async addProduct(
    order_id: number,
    quantity: number,
    product_id: string
  ): Promise<BaseOrder> {
    try {
      const connection = await Client.connect();
      const sql = `INSERT INTO order_product (quantity,order_id,product_id) VALUES (${quantity}, ${order_id} , ${product_id}) RETURNING *`;
      const response = await connection.query(sql);
      console.log('join table', response);
      return response.rows[0];
    } catch (error) {
      throw new Error('cannot add product');
    }
  }
  async create(user_id: number, status: Status): Promise<Order> {
    try {
      console.log(status);
      const connection = await Client.connect();
      const sql = `INSERT INTO orders (user_id,status) VALUES (${user_id}, '${Status.ACTIVE}') RETURNING *`;
      const response = await connection.query(sql);
      return response.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error('Cannot add order');
    }
  }
}
