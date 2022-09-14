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
exports.OrderStore = exports.Status = void 0;
const database_1 = __importDefault(require("../../Database/database"));
var Status;
(function (Status) {
    Status["ACTIVE"] = "ACTIVE";
    Status["COMPLETE"] = "COMPLETE";
})(Status = exports.Status || (exports.Status = {}));
class OrderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders';
                const { rows } = yield connection.query(sql);
                const orders = [];
                const orderProductsSql = `SELECT product_id, quantity FROM order_product WHERE order_id=($1)`;
                for (const order of rows) {
                    const { rows: orderProductsRows } = yield connection.query(orderProductsSql, [order.id]);
                    orders.push(Object.assign(Object.assign({}, order), { products: orderProductsRows }));
                }
                connection.release();
                return orders;
            }
            catch (error) {
                console.log(error);
                throw new Error('Cannot get orders');
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM orders WHERE id=($1)';
                const connection = yield database_1.default.connect();
                const { rows } = yield connection.query(sql, [id]);
                const order = rows[0];
                const orderProductsSql = 'SELECT product_id, quantity FROM order_product WHERE order_id=($1)';
                const { rows: orderProductRows } = yield connection.query(orderProductsSql, [id]);
                connection.release();
                return Object.assign(Object.assign({}, order), { products: orderProductRows });
            }
            catch (error) {
                throw new Error('Cannot get order');
            }
        });
    }
    completeOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let errorMessage = 'Cannot complete order';
            try {
                const connection = yield database_1.default.connect();
                const sql = `UPDATE orders SET status = 'COMPLETE' where id = ${id} RETURNING *`;
                const response = yield connection.query(sql);
                console.log(response);
                if (response.rowCount === 0) {
                    errorMessage = `Cannot find order with id = ${id}`;
                    throw new Error(errorMessage);
                }
                return response.rows[0];
            }
            catch (error) {
                throw new Error(errorMessage);
            }
        });
    }
    addProduct(order_id, quantity, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = `INSERT INTO order_product (quantity,order_id,product_id) VALUES (${quantity}, ${order_id} , ${product_id}) RETURNING *`;
                const response = yield connection.query(sql);
                console.log('join table', response);
                return response.rows[0];
            }
            catch (error) {
                throw new Error('cannot add product');
            }
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { products, user_id } = order;
                const connection = yield database_1.default.connect();
                const sql = `INSERT INTO orders (user_id,status) VALUES (${user_id}, '${Status.ACTIVE}') RETURNING *`;
                const { rows } = yield connection.query(sql);
                const orderResponse = rows[0];
                const orderProductsSql = 'INSERT INTO order_product (order_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING product_id,quantity';
                const orderProducts = [];
                for (const product of products) {
                    const { product_id, quantity } = product;
                    const { rows } = yield connection.query(orderProductsSql, [
                        orderResponse.id,
                        product_id,
                        quantity,
                    ]);
                    orderProducts.push(rows[0]);
                }
                connection.release();
                return Object.assign(Object.assign({}, orderResponse), { products: orderProducts });
            }
            catch (error) {
                console.log(error);
                throw new Error('Cannot add order');
            }
        });
    }
}
exports.OrderStore = OrderStore;
