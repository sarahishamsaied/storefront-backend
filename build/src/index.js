"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myFunc = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const user_handlers_1 = __importDefault(require("./handlers/Users/user_handlers"));
const product_handlers_1 = __importDefault(require("./handlers/Products/product_handlers"));
const order_handlers_1 = require("./handlers/Orders/order_handlers");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, user_handlers_1.default)(app);
(0, product_handlers_1.default)(app);
(0, order_handlers_1.orderRoutes)(app);
const port = process.env.PORT;
const myFunc = (n) => {
    return n * n;
};
exports.myFunc = myFunc;
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
exports.default = app;
