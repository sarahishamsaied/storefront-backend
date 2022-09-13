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
const product_model_1 = __importDefault(require("../models/product.model"));
const store = new product_model_1.default();
describe('Order Models to be defined', () => {
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
        expect(store.delete).toBeDefined();
    });
    it('should have an add product to order method', () => {
        expect(store.showByCategory).toBeDefined();
    });
});
describe('Products Models Methods Functionality', () => {
    const product = {
        productname: 'product',
        price: 12,
        category: 'test',
    };
    let addedProduct;
    it('create method should create and return product object', () => __awaiter(void 0, void 0, void 0, function* () {
        addedProduct = yield store.create(product);
        console.log('=================== ADDED PRODUCT IS ==================', addedProduct);
        expect(addedProduct).toEqual(Object.assign({ id: addedProduct.id }, product));
        yield store.delete(addedProduct.id);
    }));
    it('index method should return an array ', () => __awaiter(void 0, void 0, void 0, function* () {
        const addedProduct = yield store.create(product);
        const result = yield store.index();
        expect(result).toEqual([addedProduct]);
    }));
    it('show method should return a product object when a valid is is entered', () => {
        store.show(1).then((result) => {
            expect(result).toEqual(Object.assign({ id: addedProduct.id }, product));
        });
    });
    afterAll(() => {
        store.delete(addedProduct.id);
    });
});
