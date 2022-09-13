import supertest from 'supertest';
import app from '../index';
import { BaseProduct, Product } from '../models/product.model';
import { BaseUser, User } from '../models/user.model';
import jwt from 'jsonwebtoken';
const request = supertest(app);
describe('Testing orders', () => {
  beforeAll(async () => {
    let decodedUser: User;
    const userData: BaseUser = {
      firstname: 'test',
      lastname: 'order handler',
      user_email: 'testorderhandler@test.com',
      user_password: 'testorderhandler',
    };
    const productData: BaseProduct = {
      productname: 'dummy product',
      category: 'category',
      price: 12,
    };
    const { body: responseBody } = await request
      .post('/api/auth/signup')
      .send(userData);
    const token: string = responseBody;
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err, decode) => {
      decodedUser = decode as unknown as User;
      console.log(decode);
    });
  });
  let user_id: string;
  it('Should return an error when order id is not found', () => {
    request.get('/api/order/1000').then((res) => {
      expect(res.body.message).toBe('Cannot find order with id = 1000');
    });
  });
  it('Should return an error when user id is not found', () => {
    request.get('/api/orders/user/1000').then((res) => {
      expect(res.body.message).toBe('Cannot find order with user id = 1000');
    });
  });
  afterAll(() => {
    request.delete(`/api/user/1`);
  });
});
