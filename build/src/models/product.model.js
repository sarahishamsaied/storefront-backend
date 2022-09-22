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
const database_1 = __importDefault(require("../../Database/database"));
const checkEmpty = (str) => {
    return str.length > 0 ? false : true;
};
class ProductStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT * FROM products';
                const result = yield connection.query(sql);
                return result.rows;
            }
            catch (error) {
                console.log(error);
                throw new Error('Cannot get products');
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = `SELECT * FROM products where id = ${id}`;
                const result = yield connection.query(sql);
                return result.rows[0];
            }
            catch (error) {
                console.log('=================== show error ==============');
                console.log(error);
                throw new Error('Cannot get user');
            }
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            let errorMessage = 'Cannot insert into products';
            try {
                const isNameEmpty = checkEmpty(product.productname);
                const isCategoryEmpty = checkEmpty(product.category);
                const isPriceEmpty = checkEmpty(product.price.toString());
                if (isNameEmpty || isCategoryEmpty || isPriceEmpty) {
                    errorMessage = 'Fields cannot be empty';
                    throw new Error(errorMessage);
                }
                const connection = yield database_1.default.connect();
                const sql = `INSERT INTO products (productname,price,category) VALUES ('${product.productname}',${product.price},'${product.category}') RETURNING *`;
                const addedProduct = yield connection.query(sql);
                return addedProduct.rows[0];
            }
            catch (error) {
                console.log('=================== create error ==============');
                console.log(error);
                throw new Error(errorMessage);
            }
        });
    }
    showByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = `SELECT * FROM products where category = '${category}'`;
                const result = yield connection.query(sql);
                return result.rows;
            }
            catch (error) {
                console.log(error);
                throw new Error('Cannot get products');
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let errorMessage = 'Cannot delete product';
            try {
                const connection = yield database_1.default.connect();
                const sql = `DELETE FROM products where id = ${id}`;
                const result = yield connection.query(sql);
                if (result.rowCount === 0) {
                    errorMessage = `Product with id = ${id} is not found`;
                    throw new Error(errorMessage);
                }
            }
            catch (error) {
                console.log('=================== delete error ==============');
                console.log(error);
                throw new Error(errorMessage);
            }
        });
    }
}
exports.default = ProductStore;
