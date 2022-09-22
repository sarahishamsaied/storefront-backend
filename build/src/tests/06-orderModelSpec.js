"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = require("../models/order.model");
const OrderStoreInstance = new order_model_1.OrderStore();
describe('Order Model', () => {
    let createdOrder;
    const order = {
        products: [
            {
                product_id: '1',
                quantity: 535,
            },
        ],
        user_id: '1',
        status: order_model_1.Status.ACTIVE,
    };
    function createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            return OrderStoreInstance.create(order);
        });
    }
    it('should have an index method', () => {
        expect(OrderStoreInstance.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(OrderStoreInstance.show).toBeDefined();
    });
    it('should have a add method', () => {
        expect(OrderStoreInstance.create).toBeDefined();
    });
    it('add method should add a order', () => __awaiter(void 0, void 0, void 0, function* () {
        createdOrder = yield createOrder(order);
        expect(createdOrder).toEqual({
            id: 2,
            user_id: 1,
            status: order_model_1.Status.ACTIVE,
            products: [
                {
                    product_id: '1',
                    quantity: 535,
                },
            ],
        });
    }));
    it('index method should return all orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const orderList = yield OrderStoreInstance.index();
        expect(orderList.length).toEqual(2);
    }));
    it('show method should return the correct order', () => __awaiter(void 0, void 0, void 0, function* () {
        const orderFromDb = yield OrderStoreInstance.show('2');
        expect(orderFromDb).toEqual(createdOrder);
    }));
});
