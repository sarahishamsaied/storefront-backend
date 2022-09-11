import Client from '../../Database/database';

export type Product = {
  id: number;
  productname: string;
  price: number;
  category: string;
};
const checkEmpty = (str: string) => {
  return str.length > 0 ? false : true;
};
export default class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await connection.query(sql);
      return result.rows;
    } catch (error) {
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
      throw new Error('Cannot get user');
    }
  }
  async create(product: Product): Promise<Product> {
    let errorMessage = 'Cannot insert into products';
    try {
      const isNameEmpty: boolean = checkEmpty(product.productname);
      const isCategoryEmpty: boolean = checkEmpty(product.category);
      const isPriceEmpty: boolean = checkEmpty(product.price.toString());
      if (isNameEmpty || isCategoryEmpty || isPriceEmpty) {
        errorMessage = 'Fields cannot be empty';
        throw new Error(errorMessage);
      }
      const connection = await Client.connect();
      const sql = `INSERT INTO products (productname,price,category) VALUES ('${product.productname}','${product.price}','${product.category}')`;
      const addedProduct = await connection.query(sql);
      return addedProduct.rows[0];
    } catch (error) {
      throw new Error(errorMessage);
    }
  }
  async showByCategory(category: string): Promise<Product[]> {
    try {
      const connection = await Client.connect();
      const sql = `SELECT * FROM products where category = '${category}'`;
      const result = await connection.query(sql);
      return result.rows;
    } catch (error) {
      throw new Error('Cannot get products');
    }
  }
  async delete(id: string): Promise<void> {
    let errorMessage = 'Cannot delete product';
    try {
      const connection = await Client.connect();
      const sql = `DELETE FROM products where id = ${id}`;
      const result = await connection.query(sql);
      console.log(
        '================= ROW COUNT =======================',
        result.rowCount
      );
      if (result.rowCount === 0) {
        errorMessage = `Product with id = ${id} is not found`;
        throw new Error(errorMessage);
      }
      console.log(result);
    } catch (error) {
      throw new Error(errorMessage);
    }
  }
}
