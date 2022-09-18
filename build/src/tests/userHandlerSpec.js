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
describe('User Handler', () => {
    const userData = {
        user_email: 'hansmeier',
        firstname: 'Hans',
        lastname: 'Meier',
        user_password: 'password123',
    };
    let token;
    it('gets the create endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        request
            .post('/api/auth/signup')
            .send(userData)
            .then((res) => {
            const { body, status } = res;
            token = body.token;
            expect(status).toBe(200);
        });
    }));
    // it('should require authorization on every endpoint', () => {
    //   request.get('/api/users').then((res) => {
    //     expect(res.status).toBe(401);
    //   });
    //   request.get(`/api/user/1`).then((res) => {
    //     expect(res.status).toBe(401);
    //   });
    //   request.delete(`/api/user/1`).then((res) => {
    //     expect(res.status).toBe(401);
    //   });
    // });
    // it('gets the read endpoint', () => {
    //   token = jwt.sign({ user: userData }, process.env.TOKEN_SECRET as string);
    //   request
    //     .get(`/api/user/1`)
    //     .auth(token, { type: 'bearer' })
    //     .then((res) => {
    //       expect(res.status).toBe(200);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // });
    // it('gets the auth endpoint', () => {
    //   request
    //     .post('/api/auth/signin')
    //     .send({
    //       username: userData.user_email,
    //       password: userData.user_password,
    //     })
    //     .set('Authorization', 'bearer ' + token)
    //     .then((res) => {
    //       expect(res.status).toBe(200);
    //     });
    // });
    // it('gets the auth endpoint with wrong password', () => {
    //   request
    //     .post('/api/auth/signin')
    //     .send({
    //       username: userData.user_email,
    //       password: 'wrongpw',
    //     })
    //     .set('Authorization', 'bearer ' + token)
    //     .then((res) => {
    //       expect(res.status).toBe(400);
    //     });
    // });
    // it('gets the delete endpoint', () => {
    //   request
    //     .delete(`/api/user/1`)
    //     .set('Authorization', 'bearer ' + token)
    //     .then((res) => {
    //       expect(res.status).toBe(200);
    //     });
    // });
});
