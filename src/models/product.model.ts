import Client from '../../Database/database';

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};
export default class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await connection.query(sql);
      return result.rows;
    } catch (error) {
      console.log(error);
      throw new Error('Cannot get products');
    }
  }
  async show(id: string): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql = `SELECT * FROM products where id = ${id}`;
      const result = await connection.query(sql);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error('Cannot get product');
    }
  }
  async create(product: Product): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql = `INSERT INTO products (productname,price,category) VALUES ('${product.name}','${product.price}','${product.category}')`;
      const addedProduct = await connection.query(sql);
      return addedProduct.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error('Cannot insert into products');
    }
  }
  async showByCategory(category: string): Promise<Product[]> {
    try {
      const connection = await Client.connect();
      const sql = `SELECT * FROM products where category = '${category}'`;
      const result = await connection.query(sql);
      return result.rows;
    } catch (error) {
      console.log(error);
      throw new Error('Cannot get products');
    }
  }
  async delete(id: string): Promise<void> {
    try {
      const connection = await Client.connect();
      const sql = `DELETE FROM products where id = ${id}`;
      const result = await connection.query(sql);
      console.log(result);
    } catch (error) {
      console.log(error);
      throw new Error('Cannot delete product');
    }
  }
}
