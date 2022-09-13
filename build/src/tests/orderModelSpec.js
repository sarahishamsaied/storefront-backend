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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = require("../models/order.model");
const product_model_1 = __importDefault(require("../models/product.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const userStore = new user_model_1.default();
const store = new order_model_1.OrderStore();
describe('Order Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a show users orders method', () => {
        expect(store.showUserOrders).toBeDefined();
    });
    it('should have an add product to order method', () => {
        expect(store.addProduct).toBeDefined();
    });
});
// ================ Testing Mehtods =======================
describe('Order Model', () => {
    let user_id, product_id;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userStore.create({
            user_email: 'user@gmail.com',
            user_password: 'userpass',
            firstname: 'user firstname',
            lastname: 'user lastname',
        });
        user_id = user.id;
        const productStore = new product_model_1.default();
        const product = yield productStore.create({
            productname: 'testproduct',
            price: 12,
            category: 'category',
        });
        product_id = product.id;
    }));
    //   it('create method should create an order', async () => {
    //     const addedOrder = await store.create(user_id, Status.ACTIVE);
    //     console.log(addedOrder);
    //     expect(addedOrder).toEqual({
    //       id: addedOrder.id,
    //       user_id: addedOrder.user_id,
    //       status: Status.ACTIVE,
    //     });
    //   });
});
