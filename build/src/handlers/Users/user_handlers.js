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
const user_model_1 = __importDefault(require("../../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new user_model_1.default();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.index();
        const token = jsonwebtoken_1.default.sign({ users: users }, process.env.TOKEN_SECRET);
        res.json({
            status: 200,
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            user_email: req.body.user_email,
            user_password: req.body.user_password,
        };
        const newUser = yield store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json({
            status: 200,
            message: 'success',
            token,
        });
    }
    catch (error) {
        let message;
        if (error instanceof Error)
            message = error.message;
        else
            message = String(error);
        res.status(400).send(message);
    }
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield store.remove(id);
        res.status(200).json({
            status: 200,
            removed: 'success',
            result,
        });
    }
    catch (err) {
        if (err instanceof Error)
            res.status(400).json({ status: 400, message: err.message });
        else
            console.log('err' + err);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        console.log(id);
        const result = yield store.update(id);
        res.status(200).json({
            status: 200,
            message: 'succeess',
        });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ status: 400, message: error.message });
        else
            console.log('err' + error);
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_email, user_password } = req.body;
        const foundUser = yield store.login(user_email, user_password);
        const token = jsonwebtoken_1.default.sign({ user: foundUser }, process.env.TOKEN_SECRET);
        res.json({
            status: 200,
            message: 'succeess',
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
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield store.getUser(id);
        const token = jsonwebtoken_1.default.sign({ user: user }, process.env.TOKEN_SECRET);
        res.json({
            status: 200,
            token,
        });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ message: error.message });
    }
});
const userRoutes = (app) => {
    app.get('/api/users', index);
    app.get('/api/user/:id', show);
    app.post('/api/auth/signup', create);
    app.delete('/api/user/:id', remove);
    app.patch('/api/user/:id', update);
    app.post('/api/auth/signin', login);
};
exports.default = userRoutes;
