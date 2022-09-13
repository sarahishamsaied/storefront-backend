"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe('Testing Users', () => {
    const user = {
        firstname: 'test',
        lastname: 'user',
        user_email: 'testuser@gmail.com',
        user_password: 'testpassword',
    };
    it('should return a success message when creating a user', () => {
        request
            .post('/api/auth/signup')
            .send(user)
            .then((res) => {
            expect(res.body.message).toBe('success');
            expect(res.statusCode).toBe(200);
        });
    });
    it('GET API should return an error when an invalid id is passed', () => {
        request.get('/api/user/1000').then((res) => {
            expect(res.body.message).toBe('User with id = 1000 is not found');
            expect(res.statusCode).toBe(400);
        });
    });
    it('Delete API should return an error when user is not found ', () => {
        request.delete('/api/user/1000').then((res) => {
            expect(res.body.message).toBe('User not found');
        });
    });
    it('Sign in API should return an error when an email that doesnt exist is entered', () => {
        request
            .post('/api/auth/signin')
            .send({
            user_email: 'doesntexist',
            user_password: 'test',
        })
            .then((res) => {
            expect(res.body.message).toBe('User not found');
        });
    });
    it('Sign up method should return an error when an input field is missing', () => {
        request
            .post('/api/auth/signup')
            .send({
            firstname: '',
            lastname: '',
            user_email: '',
            user_password: '',
        })
            .then((res) => {
            expect(res.body.message).toBe('All fields must be filled');
        });
    });
});
