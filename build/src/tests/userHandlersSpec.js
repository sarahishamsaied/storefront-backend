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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe('Testing Users', () => {
    it('Should return an error when an invalid id is passed', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/api/user/1000');
        expect(res.body.message).toBe('User with id = 1000 is not found');
    }));
    it('Should return an error when user is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.delete('/api/user/1000');
        expect(res.body.message).toBe('User not found');
    }));
    it('Should return an error when an email that doesnt exist is entered', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post('/api/auth/signin').send({
            user_email: 'doesntexist',
            user_password: 'test',
        });
        expect(res.body.message).toBe('User not found');
    }));
    it('Should return an error when an email that doesnt exist is entered', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post('/api/auth/signin').send({
            user_email: 'doesntexist',
            user_password: 'test',
        });
        expect(res.body.message).toBe('User not found');
    }));
    it('Should return an error when an input field is missing when signing up', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post('/api/auth/signup').send({
            firstname: '',
            lastname: '',
            user_email: '',
            user_password: '',
        });
        expect(res.body.message).toBe('All fields must be filled');
    }));
});
