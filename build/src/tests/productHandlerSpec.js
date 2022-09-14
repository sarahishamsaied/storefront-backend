"use strict";
// import supertest from 'supertest';
// import jwt, { Secret } from 'jsonwebtoken';
// import app from '../index';
// import { BaseProduct } from '../models/product.model';
// import { BaseUser } from '../models/user.model';
// const request = supertest(app);
// const SECRET = process.env.TOKEN_SECRET as Secret;
// describe('Product Handler', () => {
//   const product: BaseProduct = {
//     productname: 'stupid product',
//     price: 999,
//     category: 'test',
//   };
//   let token: string, userId: number, productId: number;
//   beforeAll(async () => {
//     const userData: BaseUser = {
//       user_email: 'imtired@gmail.com',
//       firstname: 'Produkt',
//       lastname: 'Tester',
//       user_password: 'password123',
//     };
//     const { body } = await request.post('/api/auth/signup').send(userData);
//     token = body.token;
//   });
//   afterAll(async () => {
//     await request
//       .delete(`/user/${userId}`)
//       .set('Authorization', 'bearer ' + token);
//   });
//   it('gets the create endpoint', () => {
//     request
//       .post('/api/product')
//       .send(product)
//       .set('Authorization', 'bearer ' + token)
//       .then((res) => {
//         const { body, status } = res;
//         expect(status).toBe(200);
//         productId = body.id;
//       });
//   });
//   it('gets the index endpoint', () => {
//     request.get('/api/products').then((res) => {
//       expect(res.status).toBe(200);
//     });
//   });
//   it('gets the read endpoint', () => {
//     request.get(`/api/product/${productId}`).then((res) => {
//       expect(res.status).toBe(200);
//     });
//   });
//   it('gets the delete endpoint', () => {
//     request
//       .delete(`/api/product/${productId}`)
//       .set('Authorization', 'bearer ' + token)
//       .then((res) => {
//         expect(res.status).toBe(200);
//       });
//   });
// });
