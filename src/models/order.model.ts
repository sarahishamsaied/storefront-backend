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
  async completeOrder(id: string): Promise<void> {
    let errorMessage = 'Cannot complete order';
    try {
      const connection = await Client.connect();
      const sql = `UPDATE orders SET status = 'COMPLETE' where id = ${id}`;
      const response = await connection.query(sql);
      console.log(response);
      if (response.rowCount === 0) {
        errorMessage = `Cannot find order with id = ${id}`;
        throw new Error(errorMessage);
      }
    } catch (error) {
      throw new Error(errorMessage);
    }
  }
  async showUserOrders(uid: string): Promise<Order[]> {
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
      throw new Error('cannot add product');
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
      throw new Error('Cannot add order');
    }
  }
}
