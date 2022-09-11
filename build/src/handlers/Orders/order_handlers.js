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
exports.orderRoutes = void 0;
const order_model_1 = require("../../models/order.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new order_model_1.OrderStore();
const orderRoutes = (app) => {
    app.get('/api/orders', index);
    app.get('/api/order/:id', show);
    app.post('/api/order', create);
    app.post('/api/orders/:id/products', addProduct);
    app.get('/api/orders/user/:uid', showUserOrders);
    app.get('/api/orders/complete/:id', completeOrder);
};
exports.orderRoutes = orderRoutes;
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield store.index();
    res.json({
        response,
    });
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const response = yield store.create(userId, order_model_1.Status.ACTIVE);
        res.json({
            response,
        });
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error)
            res.status(500).json({
                status: 500,
                message: error.message,
            });
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const order = yield store.show(id);
        const token = jsonwebtoken_1.default.sign({ order }, process.env.TOKEN_SECRET);
        res.json({
            message: 'success',
            token,
        });
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error)
            res.status(400).json({
                message: error.message,
            });
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
        console.log(error);
        if (error instanceof Error)
            res.status(400).json({
                status: 400,
                message: error.message,
            });
    }
});
const showUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.uid;
        const orders = yield store.showUserOrders(userId);
        const token = jsonwebtoken_1.default.sign({ orders }, process.env.TOKEN_SECRET);
        res.json({ token });
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error)
            res.status(500).json({
                status: 500,
                message: error.message,
            });
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.id;
        const productId = req.body.productId;
        const quantity = parseInt(req.body.quantity);
        console.log(orderId, productId, quantity);
        const addedProduct = yield store.addProduct(orderId, quantity, productId);
        res.json(addedProduct);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({
                status: 500,
                message: error.message,
            });
    }
});
