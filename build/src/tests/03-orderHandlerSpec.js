"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const order_model_1 = require("../models/order.model");
const _01_userHandlerSpec_1 = require("./01-userHandlerSpec");
const _02_productHandlerSpec_1 = require("./02-productHandlerSpec");
const request = (0, supertest_1.default)(index_1.default);
describe('Order Handler', () => {
    let order, user_id;
    beforeAll(() => {
        request
            .post('/api/product')
            .set('Authorization', 'bearer ' + _01_userHandlerSpec_1.token)
            .send(_02_productHandlerSpec_1.product)
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
            status: order_model_1.Status.ACTIVE,
        };
    });
    it('gets the create endpoint', () => {
        request
            .post('/api/order')
            .send(order)
            .set('Authorization', 'bearer ' + _01_userHandlerSpec_1.token)
            .then((res) => {
            const { status } = res;
            expect(status).toBe(200);
            expect(res.body.message).toBe('success');
        });
    });
    it('gets the index endpoint', () => {
        request
            .get('/api/orders')
            .set('Authorization', 'bearer ' + _01_userHandlerSpec_1.token)
            .then((res) => {
            expect(res.status).toBe(200);
        })
            .catch((e) => console.log(e));
    });
    it('gets the read endpoint', () => {
        request
            .get(`/api/order/1`)
            .set('Authorization', 'bearer ' + _01_userHandlerSpec_1.token)
            .then((res) => {
            expect(res.status).toBe(200);
        })
            .catch((e) => console.log(e));
    });
});
