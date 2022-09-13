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
const user_model_1 = __importDefault(require("../models/user.model"));
const store = new user_model_1.default();
describe('User Model', () => {
    const user = {
        firstname: 'Hans',
        lastname: 'Zimmer',
        user_email: 'hanszimmer@gmail.com',
        user_password: 'password123',
    };
    let createdUser;
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.login).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a remove method', () => {
        expect(store.remove).toBeDefined();
    });
    it('create method should create a user', () => __awaiter(void 0, void 0, void 0, function* () {
        store.create(user).then((res) => {
            createdUser = res;
            if (createdUser) {
                const { user_email, firstname, lastname } = createdUser;
                expect(user_email).toBe(user.user_email);
                expect(firstname).toBe(user.firstname);
                expect(lastname).toBe(user.lastname);
            }
            console.log(createdUser);
        });
    }));
});
