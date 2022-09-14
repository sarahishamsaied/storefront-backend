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
const UserStoreInstance = new user_model_1.default();
describe('User Model', () => {
    const user = {
        user_email: 'hansmeier',
        firstname: 'Hans',
        lastname: 'Meier',
        user_password: 'password123',
    };
    function createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserStoreInstance.create(user);
        });
    }
    function deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserStoreInstance.remove(id);
        });
    }
    it('should have an index method', () => {
        expect(UserStoreInstance.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(UserStoreInstance.getUser).toBeDefined();
    });
    it('should have a create method', () => {
        expect(UserStoreInstance.create).toBeDefined();
    });
    it('should have a remove method', () => {
        expect(UserStoreInstance.remove).toBeDefined();
    });
    it('create method should create a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        if (createdUser) {
            const { user_email, firstname, lastname } = createdUser;
            expect(user_email).toBe(user.user_email);
            expect(firstname).toBe(user.firstname);
            expect(lastname).toBe(user.lastname);
        }
        yield deleteUser(createdUser.id);
    }));
    it('index method should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        const userList = yield UserStoreInstance.index();
        expect(userList).toEqual([createdUser]);
        yield deleteUser(createdUser.id);
    }));
    it('show method should return the correct users', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        const userFromDb = yield UserStoreInstance.getUser(createdUser.id);
        expect(userFromDb).toEqual(createdUser);
        yield deleteUser(createdUser.id);
    }));
    it('remove method should remove the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        yield deleteUser(createdUser.id);
        const userList = yield UserStoreInstance.index();
        expect(userList).toEqual([]);
    }));
});
