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
                const response = yield connection.query(sql);
                return response.rows;
            }
            catch (error) {
                console.log(error);
                throw new Error('Cannot get orders');
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let errorMessage = 'Cannot get order';
            try {
                const connection = yield database_1.default.connect();
                const sql = `SELECT * FROM orders where id = ${id}`;
                const response = yield connection.query(sql);
                if (response.rows.length === 0) {
                    errorMessage = `Cannot find order with id = ${id}`;
                    throw new Error(errorMessage);
                }
                else
                    return response.rows[0];
            }
            catch (error) {
                console.log(error);
                throw new Error(errorMessage);
            }
        });
    }
    completeOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let errorMessage = 'Cannot complete order';
            try {
                const connection = yield database_1.default.connect();
                const sql = `UPDATE orders SET status = 'COMPLETE' where id = ${id}`;
                const response = yield connection.query(sql);
                console.log(response);
                if (response.rowCount === 0) {
                    errorMessage = `Cannot find order with id = ${id}`;
                    throw new Error(errorMessage);
                }
            }
            catch (error) {
                console.log(error);
                throw new Error(errorMessage);
            }
        });
    }
    showUserOrders(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            let errorMessage = 'Cannot show orders';
            try {
                const connection = yield database_1.default.connect();
                const sql = `SELECT * FROM orders where user_id = ${uid}`;
                const orders = yield connection.query(sql);
                if (orders.rowCount === 0) {
                    errorMessage = `Cannot find order with user id = ${uid}`;
                    throw new Error(errorMessage);
                }
                return orders.rows;
            }
            catch (error) {
                console.log(error);
                throw new Error(errorMessage);
            }
        });
    }
    addProduct(order_id, quantity, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = `INSERT INTO order_product (quantity,order_id,product_id) VALUES (${quantity}, ${order_id} , ${product_id})`;
                const response = yield connection.query(sql);
                const order = response.rows[0];
                console.log(order);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    create(user_id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(status);
                const connection = yield database_1.default.connect();
                const sql = `INSERT INTO orders (user_id,status) VALUES (${user_id}, '${Status.ACTIVE}')`;
                const response = yield connection.query(sql);
                const order = response.rows[0];
                console.log(order);
            }
            catch (error) {
                console.log(error);
                throw new Error('Cannot add order');
            }
        });
    }
}
exports.OrderStore = OrderStore;
