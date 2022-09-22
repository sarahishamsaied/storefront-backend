import Client from '../../Database/database';

export interface BaseProduct {
  productname: string;
  price: number;
  category: string;
}
export interface Product extends BaseProduct {
  id: string;
  productname: string;
  price: number;
  category: string;
}
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
      console.log('=================== show error ==============');

      console.log(error);
      throw new Error('Cannot get user');
    }
  }
  async create(product: BaseProduct): Promise<Product> {
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
      const sql = `INSERT INTO products (productname,price,category) VALUES ('${product.productname}',${product.price},'${product.category}') RETURNING *`;
      const addedProduct = await connection.query(sql);
      return addedProduct.rows[0];
    } catch (error) {
      console.log('=================== create error ==============');
      console.log(error);
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
      console.log(error);
      throw new Error('Cannot get products');
    }
  }
  async delete(id: string): Promise<void> {
    let errorMessage = 'Cannot delete product';
    try {
      const connection = await Client.connect();
      const sql = `DELETE FROM products where id = ${id}`;
      const result = await connection.query(sql);
      if (result.rowCount === 0) {
        errorMessage = `Product with id = ${id} is not found`;
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.log('=================== delete error ==============');
      console.log(error);
      throw new Error(errorMessage);
    }
  }
}
