import supertest from 'supertest';
import app from '../index';
const request = supertest(app);
describe('Testing Users', () => {
  it('Should return an error when an invalid id is entered', async () => {
    const response = await request.get('/api/user/1000');
    expect(response.body.message).toBe('');
    expect(response.body.message).toBe('User with id = 1000 is not found');
  });
});
