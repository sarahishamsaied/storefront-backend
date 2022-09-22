import supertest from 'supertest';
import app from '../index';
import { BaseProduct } from '../models/product.model';
import { token } from './01-userHandlerSpec';
const request = supertest(app);
export const product: BaseProduct = {
  productname: 'STUPID PRODUCT',
  price: 999,
  category: 'test',
};
describe('Product Handler', () => {
  it('gets the create endpoint', () => {
    request
      .post('/api/product')
      .send(product)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(200);
      });
  });

  it('gets the index endpoint', () => {
    request.get('/api/products').then((res) => {
      expect(res.status).toBe(200);
    });
  });
  it('gets the read endpoint', () => {
    request.get(`/api/product/1`).then((res) => {
      expect(res.status).toBe(200);
    });
  });
  //   it('gets the delete endpoint', () => {
  //     request
  //       .delete(`/api/product/1`)
  //       .set('Authorization', 'bearer ' + token)
  //       .then((res) => {
  //         expect(res.status).toBe(200);
  //       });
  //   });
});
