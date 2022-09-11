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
const request = (0, supertest_1.default)(index_1.default);
describe('Testing Products', () => {
    it('should return an error when a product is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/product/1000');
        expect(response.body.message).toBe('Cannot find product');
    }));
    it('should return an error when a category is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/product/category/invalidcategory');
        expect(response.body.message).toBe('Cannot find product(s)');
    }));
    it('should return success message when getting all products', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/products');
        console.log(response.body);
        expect(response.body.message).toBe('success');
    }));
    it('should return error message when at least one field is empty', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/api/product').send({
            productname: '',
            category: '',
            price: '',
        });
        expect(response.body.message).toBe('Fields cannot be empty');
    }));
    it('should return error message when at when deleting a product with an invalid id is entered', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.delete('/api/product/1000');
        console.log('rslt is', response.body);
        expect(response.body.message).toBe('Product with id = 1000 is not found');
    }));
});
