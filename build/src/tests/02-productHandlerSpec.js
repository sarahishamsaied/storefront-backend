"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.product = void 0;
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const _01_userHandlerSpec_1 = require("./01-userHandlerSpec");
const request = (0, supertest_1.default)(index_1.default);
exports.product = {
    productname: 'STUPID PRODUCT',
    price: 999,
    category: 'test',
};
describe('Product Handler', () => {
    it('gets the create endpoint', () => {
        request
            .post('/api/product')
            .send(exports.product)
            .set('Authorization', 'bearer ' + _01_userHandlerSpec_1.token)
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
