import Client from '../../Database/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export type User = {
  firstname: string;
  lastname: string;
  user_email: string;
  user_password: string;
};
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

const getUserByEmail = async (email: string): Promise<User> => {
  try {
    const connection = await Client.connect();
    const sql = `SELECT * FROM users WHERE user_email = '${email}'`;
    const result = await connection.query(sql);
    connection.release();
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw new Error('Error getting user');
  }
};
const addUser = async (user: User): Promise<User> => {
  try {
    const connection = await Client.connect();
    const sql = `INSERT INTO users (firstname,lastname,user_email,user_password) VALUES ('${user.firstname}','${user.lastname}','${user.user_email}' ,'${user.user_password}') `;
    const result = await connection.query(sql);
    connection.release();
    return user;
  } catch (error) {
    console.log(error);
    throw new Error('Cannot add user');
  }
};
const authenticate = async (
  email: string,
  password: string
): Promise<boolean> => {
  try {
    const foundUser = await getUserByEmail(email);
    console.log(foundUser);
    console.log(
      '---------------------------- passwords are =======================',
      password,
      foundUser.user_password
    );
    const isEqual = await bcrypt.compare(password, foundUser.user_password);
    console.log(isEqual);
    if (isEqual) return true;
    else return false;
  } catch (error) {
    console.log(error);
    throw new Error('error');
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
      console.log(error);
      throw new Error('Cannot get users');
    }
  }
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
      console.log(error);
      throw new Error(errorMessage);
    }
  }
  async login(email: string, password: string): Promise<User> {
    let errorMessage = 'Internal Server Error';
    try {
      const doesExist = await checkUserExists(email);
      if (doesExist) {
        const res = await authenticate(email, password);
        if (res) {
          const user = await getUserByEmail(email);
          console.log(user.firstname);
          const obj = {
            firstname: user.firstname,
            lastname: user.lastname,
            user_email: user.user_email,
          } as User;
          console.log(obj);
          return obj;
        } else {
          errorMessage = 'Incorrect Password';
          throw new Error(errorMessage);
        }
      } else {
        errorMessage = 'User not found';
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.log(error);
      throw new Error(errorMessage);
    }
  }
  async create(user: User): Promise<User> {
    let errorMessage = 'Cannot insert into users';
    try {
      const isEmailEmpty: boolean = checkEmpty(user.user_email);
      const isPasswordEmpty: boolean = checkEmpty(user.user_password);
      const isFirstNameEmpty: boolean = checkEmpty(user.firstname);
      const isLastNameEmpty: boolean = checkEmpty(user.lastname);
      console.log(isEmailEmpty);
      if (
        isEmailEmpty ||
        isPasswordEmpty ||
        isFirstNameEmpty ||
        isLastNameEmpty
      ) {
        console.log('invalid');
        errorMessage = 'All fields must be filled';
        throw new Error(errorMessage);
      }
      user.user_password = bcrypt.hashSync(
        user.user_password,
        parseInt(process.env.SALT_ROUNDS as string)
      );
      console.log(user);
      const userExists = await getUserByEmail(user.user_email);
      if (!userExists) return addUser(user);
      else {
        errorMessage = 'User already exists';
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.log(error);
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
  async update(id: string): Promise<void> {
    let errorMessage = 'An error occured';
    try {
      const connection = await Client.connect();
      const user = await this.getUser(id);
      if (!user) {
        errorMessage = 'User does not exist';
        throw new Error(errorMessage);
      }
      const sql = `UPDATE users SET firstname = '${user.firstname}', lastname = '${user.lastname}', user_email = '${user.user_email}', user_password = '${user.user_password}' WHERE id = ${id}; `;
      const result = await connection.query(sql);
      console.log(result.rowCount);
    } catch (e) {
      console.log(e);
      throw new Error(errorMessage);
    }
  }
}
