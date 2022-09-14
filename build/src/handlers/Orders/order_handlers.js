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
exports.orderRoutes = void 0;
const order_model_1 = require("../../models/order.model");
const token_verification_1 = require("../../middlewares/token-verification");
const store = new order_model_1.OrderStore();
const orderRoutes = (app) => {
    app.get('/api/orders', token_verification_1.checkAuthHeader, index);
    app.get('/api/order/:id', token_verification_1.checkAuthHeader, show);
    app.post('/api/order', token_verification_1.checkAuthHeader, create);
    app.post('/api/orders/:id/products', token_verification_1.checkAuthHeader, addProduct);
    app.get('/api/orders/complete/:id', token_verification_1.checkAuthHeader, completeOrder);
};
exports.orderRoutes = orderRoutes;
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield store.index();
        res.json({
            message: 'success',
            orders,
        });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({
                message: error.message,
            });
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = req.body.products;
        const user_id = req.body.user_id;
        if (products === undefined || user_id === undefined) {
            console.log(products);
            res.status(400);
            res.send('All fields must be filled');
            return;
        }
        const order = yield store.create({
            products,
            status: order_model_1.Status.ACTIVE,
            user_id,
        });
        res.json({
            message: 'success',
            order,
        });
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const order = yield store.show(id);
        res.json({
            message: 'success',
            order,
        });
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const completeOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const response = yield store.completeOrder(id);
        console.log(response);
        res.json({
            message: 'success',
        });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({
                status: 400,
                message: error.message,
            });
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.id;
        const productId = req.body.product_id;
        const quantity = req.body.quantity;
        console.log(orderId, productId, quantity);
        const addedProduct = yield store.addProduct(orderId, quantity, productId);
        res.json({
            message: 'success',
        });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({
                status: 500,
                message: error.message,
            });
    }
});
