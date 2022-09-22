import Client from '../../Database/database';
export interface BaseOrder {
  products: OrderProduct[];
  user_id: string;
  status: Status;
}
export interface OrderProduct {
  product_id: string;
  quantity: number;
}
export interface Order extends BaseOrder {
  id: string;
  user_id: string;
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
      const { rows } = await connection.query(sql);
      const orders = [];
      const orderProductsSql = `SELECT product_id, quantity FROM order_product WHERE order_id=($1)`;
      for (const order of rows) {
        const { rows: orderProductsRows } = await connection.query(
          orderProductsSql,
          [order.id]
        );
        orders.push({
          ...order,
          products: orderProductsRows,
        });
      }
      connection.release();
      return orders;
    } catch (error) {
      console.log(error);
      throw new Error('Cannot get orders');
    }
  }
  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [id]);
      const order = rows[0];
      const orderProductsSql =
        'SELECT product_id, quantity FROM order_product WHERE order_id=($1)';
      const { rows: orderProductRows } = await connection.query(
        orderProductsSql,
        [id]
      );
      connection.release();
      return {
        ...order,
        products: orderProductRows,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Cannot get order');
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
      console.log(error);
      throw new Error(errorMessage);
    }
  }
  async addProduct(
    order_id: string,
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
      console.log(error);
      throw new Error('cannot add product');
    }
  }
  async create(order: BaseOrder): Promise<Order> {
    try {
      const { products, user_id } = order;
      const connection = await Client.connect();
      const sql = `INSERT INTO orders (user_id,status) VALUES (${user_id}, '${Status.ACTIVE}') RETURNING *`;
      const { rows } = await connection.query(sql);
      const orderResponse = rows[0];
      const orderProductsSql =
        'INSERT INTO order_product (order_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING product_id,quantity';
      const orderProducts = [];
      for (const product of products) {
        const { product_id, quantity } = product;
        const { rows } = await connection.query(orderProductsSql, [
          orderResponse.id,
          product_id,
          quantity,
        ]);
        orderProducts.push(rows[0]);
      }
      connection.release();
      return {
        ...orderResponse,
        products: orderProducts,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Cannot add order');
    }
  }
}
