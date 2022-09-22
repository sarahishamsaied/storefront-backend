"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthHeader = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function checkAuthHeader(req, res, next) {
    if (!req.headers.authorization) {
        res.status(401);
        console.log('access denied');
        res.json('Access denied, invalid token');
        return false;
    }
    try {
        const token = req.headers.authorization.slice(7);
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return false;
    }
}
exports.checkAuthHeader = checkAuthHeader;
