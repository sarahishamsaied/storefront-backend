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
const ProductStoreInstance = new product_model_1.default();
describe('Product Model', () => {
    const product = {
        productname: 'Product Test',
        price: 2000,
        category: 'test cat',
    };
    function createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return ProductStoreInstance.create(product);
        });
    }
    function deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return ProductStoreInstance.delete(id);
        });
    }
    it('should have an index method', () => {
        expect(ProductStoreInstance.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(ProductStoreInstance.show).toBeDefined();
    });
    it('should have a add method', () => {
        expect(ProductStoreInstance.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(ProductStoreInstance.delete).toBeDefined();
    });
    it('add method should add a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdProduct = yield createProduct(product);
        expect(createdProduct).toEqual(Object.assign({ id: createdProduct.id }, product));
    }));
    it('index method should return a list of products', () => __awaiter(void 0, void 0, void 0, function* () {
        const productList = yield ProductStoreInstance.index();
        expect(productList.length).toEqual(3);
    }));
    //   it('show method should return the correct product', async () => {
    //     const createdProduct: Product = await createProduct(product);
    //     const productFromDb = await ProductStoreInstance.show(createdProduct.id);
    //     expect(productFromDb).toEqual(createdProduct);
    //     await deleteProduct(createdProduct.id);
    //   });
});
