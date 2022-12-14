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
const product_model_1 = __importDefault(require("../../models/product.model"));
const token_verification_1 = require("../../middlewares/token-verification");
const store = new product_model_1.default();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.index();
        res.json({
            message: 'success',
            products,
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const product = yield store.show(id);
        product
            ? res.json({
                message: 'success',
                product,
            })
            : res.status(400).json({
                message: 'Cannot find product',
            });
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const product = yield store.create(user);
        res.json({
            product,
            status: 'success',
        });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({
                message: error.message,
                status: 500,
            });
    }
});
const showByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cat } = req.params;
        const response = yield store.showByCategory(cat);
        response.length > 0
            ? res.json({
                data: response,
                message: 'success',
                status: 200,
            })
            : res.status(400).json({
                message: 'Cannot find product(s)',
                status: 400,
            });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
            status: 500,
        });
    }
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const response = yield store.delete(id);
        console.log(response);
        res.json({
            message: 'success',
        });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({
                message: error.message,
            });
    }
});
const productRoutes = (app) => {
    app.get('/api/products', index);
    app.post('/api/product', token_verification_1.checkAuthHeader, create);
    app.get('/api/product/:id', show);
    app.delete('/api/product/:id', token_verification_1.checkAuthHeader, remove);
    app.get('/api/product/category/:cat', token_verification_1.checkAuthHeader, showByCategory);
};
exports.default = productRoutes;
