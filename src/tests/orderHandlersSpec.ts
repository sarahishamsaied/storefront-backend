import supertest from 'supertest';
import app from '../index';
const request = supertest(app);
describe('Testing orders', () => {
  it('Should return an error when order id is not found', async () => {
    const response = await request.get('/api/order/1000');
    expect(response.body.message).toBe('Cannot find order with id = 1000');
  });
  it('Should return an error when user id is not found', async () => {
    const response = await request.get('/api/orders/user/1000');
    expect(response.body.message).toBe('Cannot find order with user id = 1000');
  });
});
