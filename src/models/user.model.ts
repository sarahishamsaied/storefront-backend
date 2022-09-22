import Client from '../../Database/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OrderStore } from './order.model';
export interface BaseUser {
  firstname: string;
  lastname: string;
  user_email: string;
  user_password: string;
}
export interface User extends BaseUser {
  id: string;
}
const checkEmpty = (str: string): boolean => {
  console.log(str.length);
  return str.length > 0 ? false : true;
};

const checkUserExists = async (id: string): Promise<boolean> => {
  const connection = await Client.connect();
  const sql = `SELECT * FROM users WHERE id = '${id}'`;
  const result = await connection.query(sql);
  connection.release();
  return result.rows.length > 0 ? true : false;
};
const checkUserExistsByEmail = async (email: string): Promise<boolean> => {
  const connection = await Client.connect();
  const sql = `SELECT * FROM users WHERE user_email = '${email}'`;
  const result = await connection.query(sql);
  connection.release();
  return result.rows.length > 0 ? true : false;
};
const getUserByEmail = async (email: string): Promise<User> => {
  try {
    const connection = await Client.connect();
    const sql = `SELECT * FROM users WHERE user_email = '${email}'`;
    const result = await connection.query(sql);
    connection.release();
    return result.rows[0];
  } catch (error) {
    throw new Error('Error getting user');
  }
};
const addUser = async (user: BaseUser): Promise<User> => {
  try {
    const connection = await Client.connect();
    const sql = `INSERT INTO users (firstname,lastname,user_email,user_password) VALUES ('${user.firstname}','${user.lastname}','${user.user_email}' ,'${user.user_password}') RETURNING * `;
    const { rows } = await connection.query(sql);
    connection.release();
    console.log(rows[0]);
    return rows[0];
  } catch (error) {
    throw new Error('Cannot add user');
  }
};

const deleteUser = async (id: string): Promise<void> => {
  const connection = await Client.connect();
  const sql = `DELETE FROM users WHERE id = ${id}`;
  const result = await connection.query(sql);
  console.log(result);
};
export default class UserStore {
  async index(): Promise<User[]> {
    try {
      const connection = await Client.connect();
      const sql = 'select * from users';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error('Cannot get users');
    }
  }
  authenticate = async (email: string, password: string): Promise<boolean> => {
    try {
      const foundUser = await getUserByEmail(email);
      console.log(foundUser);
      const isEqual = await bcrypt.compare(password, foundUser.user_password);
      console.log(isEqual);
      if (isEqual) return true;
      else return false;
    } catch (error) {
      throw new Error('error');
    }
  };
  async getUser(id: string): Promise<User> {
    let errorMessage = 'Cannot get user';
    try {
      const connection = await Client.connect();
      const sql = `SELECT * FROM users WHERE id = ${id}`;
      const result = await connection.query(sql);
      connection.release();
      console.log(result.rowCount);
      if (result.rowCount === 0) {
        errorMessage = `User with id = ${id} is not found`;
        throw new Error(errorMessage);
      } else return result.rows[0];
    } catch (error) {
      throw new Error(errorMessage);
    }
  }
  async login(email: string, password: string): Promise<User> {
    let errorMessage = 'Internal Server Error';
    try {
      const doesExist = await checkUserExistsByEmail(email);
      if (doesExist) {
        const res = await this.authenticate(email, password);
        if (res) {
          const user = await getUserByEmail(email);
          return user;
        } else {
          errorMessage = 'Incorrect Password';
          throw new Error(errorMessage);
        }
      } else {
        errorMessage = `email  ${email} doesn't exist`;
        throw new Error(errorMessage);
      }
    } catch (error) {
      throw new Error(errorMessage);
    }
  }
  async create(user: BaseUser): Promise<User> {
    let errorMessage = 'Cannot insert into users';
    try {
      const isEmailEmpty: boolean = checkEmpty(user.user_email);
      const isPasswordEmpty: boolean = checkEmpty(user.user_password);
      const isFirstNameEmpty: boolean = checkEmpty(user.firstname);
      const isLastNameEmpty: boolean = checkEmpty(user.lastname);
      if (
        isEmailEmpty ||
        isPasswordEmpty ||
        isFirstNameEmpty ||
        isLastNameEmpty
      ) {
        errorMessage = 'All fields must be filled';
        throw new Error(errorMessage);
      }
      user.user_password = bcrypt.hashSync(
        user.user_password,
        parseInt(process.env.SALT_ROUNDS as string)
      );
      const userExists = await getUserByEmail(user.user_email);
      if (!userExists) return addUser(user);
      else {
        errorMessage = `User with email = ${user.user_email} already exists`;
        throw new Error(errorMessage);
      }
    } catch (error) {
      throw new Error(errorMessage);
    }
  }
  async remove(id: string): Promise<void> {
    let errorMessage = 'Cannot remove user';
    const userExists = await checkUserExists(id);
    try {
      if (userExists) deleteUser(id);
      else {
        errorMessage = 'User not found';
        throw new Error(errorMessage);
      }
    } catch (error) {
      throw new Error(errorMessage);
    }
  }
  // async update(id: number): Promise<User> {
  //   let errorMessage = 'An error occured';
  //   try {
  //     const connection = await Client.connect();
  //     const user = await this.getUser(id);
  //     if (!user) {
  //       errorMessage = 'User does not exist';
  //       throw new Error(errorMessage);
  //     }
  //     const orderStore = new OrderStore();
  //     const orders = orderStore.(id)
  //     const sql = `UPDATE users SET firstname = '${user.firstname}', lastname = '${user.lastname}', user_email = '${user.user_email}', user_password = '${user.user_password}' WHERE id = ${id} RETURNING * `;
  //     const result = await connection.query(sql);
  //     return result.rows[0];
  //   } catch (e) {
  //     console.log(e);
  //     throw new Error(errorMessage);
  //   }
  // }
}
