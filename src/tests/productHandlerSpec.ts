import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';

import app from '../index';
import { BaseProduct } from '../models/product.model';
import { BaseUser, User } from '../models/user.model';

const request = supertest(app);
const SECRET = process.env.TOKEN_SECRET as Secret;

describe('Product Handler', () => {
  const product: BaseProduct = {
    productname: 'CodeMaster 3000',
    price: 999,
    category: 'test',
  };

  let token: string, user: User, productId: number;

  beforeAll(async () => {
    const userData: BaseUser = {
      user_email: 'produkttester',
      firstname: 'Produkt',
      lastname: 'Tester',
      user_password: 'user_password123',
    };

    const { body } = await request.post('/auth/signup').send(userData);

    token = body.token;

    jwt.verify(token, SECRET, (err, decode) => {
      user = decode as User;
      console.log('==================user is=================' + user);
    });
  });

  afterAll(async () => {
    await request
      .delete(`/users/${user.id}`)
      .set('Authorization', 'bearer ' + token);
  });

  it('gets the create endpoint', (done) => {
    request
      .post('/product')
      .send(product)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        const { body, status } = res;

        expect(status).toBe(200);

        productId = body.id;

        done();
      });
  });

  it('gets the index endpoint', (done) => {
    request.get('/products').then((res) => {
      expect(res.status).toBe(200);
      done();
    });
  });

  it('gets the read endpoint', (done) => {
    request.get(`/product/${productId}`).then((res) => {
      expect(res.status).toBe(200);
      done();
    });
  });
  it('gets the delete endpoint', (done) => {
    request
      .delete(`/product/${productId}`)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
