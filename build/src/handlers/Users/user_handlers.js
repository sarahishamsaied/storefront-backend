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
const token_verification_1 = require("../../middlewares/token-verification");
const store = new user_model_1.default();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.index();
        res.json({
            status: 200,
            users,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const user_email = req.body.user_email;
        const user_password = req.body.user_password;
        if (firstname === undefined ||
            lastname === undefined ||
            user_email === undefined ||
            user_password === undefined) {
            res.status(400).send('All parameters are required');
            return;
        }
        const user = {
            firstname,
            lastname,
            user_email,
            user_password,
        };
        const newUser = yield store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        console.log(token);
        res.json({
            status: 200,
            message: 'success',
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield store.remove(id);
        res.status(200).json({
            removed: 'success',
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
//removing update temporarly
// const update = async (req: Request, res: Response) => {
//   try {
//     const id: number = parseInt(req.params.id);
//     console.log(id);
//     const updated_user = await store.update(id);
//     res.status(200).json({
//       status: 200,
//       message: 'succeess',
//       updated_user,
//     });
//   } catch (error) {
//     if (error instanceof Error)
//       res.status(400).json({ status: 400, message: error.message });
//     else console.log('err' + error);
//   }
// };
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_email, user_password } = req.body;
        const foundUser = yield store.login(user_email, user_password);
        const token = jsonwebtoken_1.default.sign({ user: foundUser }, process.env.TOKEN_SECRET);
        res.json({
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
        if (id === undefined)
            res.status(400).json({
                message: 'missing id',
            });
        const user = yield store.getUser(id);
        res.json({
            status: 200,
            user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
const userRoutes = (app) => {
    app.get('/api/users', token_verification_1.checkAuthHeader, index);
    app.get('/api/user/:id', token_verification_1.checkAuthHeader, show);
    app.post('/api/auth/signup', create);
    app.delete('/api/user/:id', token_verification_1.checkAuthHeader, remove);
    // app.patch('/api/user/:id', update);
    app.post('/api/auth/signin', login);
};
exports.default = userRoutes;
