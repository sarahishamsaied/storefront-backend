import supertest from 'supertest';

import app from '../index';
import { BaseOrder, Status } from '../models/order.model';
import { BaseProduct } from '../models/product.model';
import { token } from './01-userHandlerSpec';
import { product } from './02-productHandlerSpec';
const request = supertest(app);

describe('Order Handler', () => {
  let order: BaseOrder, user_id: number;
  beforeAll(() => {
    request
      .post('/api/product')
      .set('Authorization', 'bearer ' + token)
      .send(product)
      .catch((e) => {
        console.log(e);
      });
    order = {
      products: [
        {
          product_id: '1',
          quantity: 5000,
        },
      ],
      user_id: '1',
      status: Status.ACTIVE,
    };
  });

  it('gets the create endpoint', () => {
    request
      .post('/api/order')
      .send(order)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        const { status } = res;
        expect(status).toBe(200);
        expect(res.body.message).toBe('success');
      });
  });
  it('gets the index endpoint', () => {
    request
      .get('/api/orders')
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
      })
      .catch((e) => console.log(e));
  });
  it('gets the read endpoint', () => {
    request
      .get(`/api/order/1`)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
      })
      .catch((e) => console.log(e));
  });
});
