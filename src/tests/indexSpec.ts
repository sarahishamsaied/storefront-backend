import { myFunc } from '../index';
import supertest from 'supertest';
import app from '../index';
const request = supertest(app);
describe('Testing Users', () => {
  it('Should return an error when an invalid id is passed', async () => {
    const res = await request.get('/api/user/1000');
    expect(res.body.message).toBe('User with id = 1000 is not found');
  });
});
