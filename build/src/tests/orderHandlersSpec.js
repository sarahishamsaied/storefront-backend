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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const request = (0, supertest_1.default)(index_1.default);
describe('Testing orders', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        let decodedUser;
        const userData = {
            firstname: 'test',
            lastname: 'order handler',
            user_email: 'testorderhandler@test.com',
            user_password: 'testorderhandler',
        };
        const productData = {
            productname: 'dummy product',
            category: 'category',
            price: 12,
        };
        const { body: responseBody } = yield request
            .post('/api/auth/signup')
            .send(userData);
        const token = responseBody;
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
            decodedUser = decode;
            console.log(decode);
        });
    }));
    let user_id;
    it('Should return an error when order id is not found', () => {
        request.get('/api/order/1000').then((res) => {
            expect(res.body.message).toBe('Cannot find order with id = 1000');
        });
    });
    it('Should return an error when user id is not found', () => {
        request.get('/api/orders/user/1000').then((res) => {
            expect(res.body.message).toBe('Cannot find order with user id = 1000');
        });
    });
    afterAll(() => {
        request.delete(`/api/user/1`);
    });
});
