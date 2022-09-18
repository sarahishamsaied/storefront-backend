import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../index';
import { BaseUser, User } from '../models/user.model';
const request = supertest(app);
describe('User Handler', () => {
  const userData: BaseUser = {
    user_email: 'testtesttest',
    firstname: 'test',
    lastname: 'test',
    user_password: 'password123',
  };

  let token: string;
  it('gets the create endpoint', async () => {
    request
      .post('/api/auth/signup')
      .send(userData)
      .then((res) => {
        const { body, status } = res;
        token = body.token;
        expect(status).toBe(200);
      });
  });
  it('should require authorization on every endpoint', () => {
    request.get('/api/users').then((res) => {
      expect(res.status).toBe(401);
    });

    request.get(`/api/user/1`).then((res) => {
      expect(res.status).toBe(401);
    });

    request.delete(`/api/user/1`).then((res) => {
      expect(res.status).toBe(401);
    });
  });

  it('gets the read endpoint', () => {
    token = jwt.sign({ user: userData }, process.env.TOKEN_SECRET as string);
    request
      .get(`/api/user/1`)
      .auth(token, { type: 'bearer' })
      .then((res) => {
        expect(res.status).toBe(200);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  it('gets the auth endpoint', () => {
    request
      .post('/api/auth/signin')
      .send({
        username: userData.user_email,
        password: userData.user_password,
      })
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('gets the auth endpoint with wrong password', () => {
    request
      .post('/api/auth/signin')
      .send({
        username: userData.user_email,
        password: 'wrongpw',
      })
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });
  it('gets the delete endpoint', () => {
    request
      .delete(`/api/user/1`)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});
