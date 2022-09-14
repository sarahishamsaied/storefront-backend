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
const database_1 = __importDefault(require("../../Database/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const checkEmpty = (str) => {
    console.log(str.length);
    return str.length > 0 ? false : true;
};
const checkUserExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield database_1.default.connect();
    const sql = `SELECT * FROM users WHERE id = '${id}'`;
    const result = yield connection.query(sql);
    connection.release();
    return result.rows.length > 0 ? true : false;
});
const checkUserExistsByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield database_1.default.connect();
    const sql = `SELECT * FROM users WHERE user_email = '${email}'`;
    const result = yield connection.query(sql);
    connection.release();
    return result.rows.length > 0 ? true : false;
});
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield database_1.default.connect();
        const sql = `SELECT * FROM users WHERE user_email = '${email}'`;
        const result = yield connection.query(sql);
        connection.release();
        return result.rows[0];
    }
    catch (error) {
        throw new Error('Error getting user');
    }
});
const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield database_1.default.connect();
        const sql = `INSERT INTO users (firstname,lastname,user_email,user_password) VALUES ('${user.firstname}','${user.lastname}','${user.user_email}' ,'${user.user_password}') RETURNING * `;
        const { rows } = yield connection.query(sql);
        connection.release();
        console.log(rows[0]);
        return rows[0];
    }
    catch (error) {
        throw new Error('Cannot add user');
    }
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield database_1.default.connect();
    const sql = `DELETE FROM users WHERE id = ${id}`;
    const result = yield connection.query(sql);
    console.log(result);
});
class UserStore {
    constructor() {
        this.authenticate = (email, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                const foundUser = yield getUserByEmail(email);
                console.log(foundUser);
                const isEqual = yield bcrypt_1.default.compare(password, foundUser.user_password);
                console.log(isEqual);
                if (isEqual)
                    return true;
                else
                    return false;
            }
            catch (error) {
                throw new Error('error');
            }
        });
        // async update(id: number): Promise<User> {
        //   let errorMessage = 'An error occured';
        //   try {
        //     const connection = await Client.connect();
        //     const user = await this.getUser(id);
        //     if (!user) {
        //       errorMessage = 'User does not exist';
        //       throw new Error(errorMessage);
        //     }
        //     const orderStore = new OrderStore();
        //     const orders = orderStore.(id)
        //     const sql = `UPDATE users SET firstname = '${user.firstname}', lastname = '${user.lastname}', user_email = '${user.user_email}', user_password = '${user.user_password}' WHERE id = ${id} RETURNING * `;
        //     const result = await connection.query(sql);
        //     return result.rows[0];
        //   } catch (e) {
        //     console.log(e);
        //     throw new Error(errorMessage);
        //   }
        // }
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'select * from users';
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error('Cannot get users');
            }
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let errorMessage = 'Cannot get user';
            try {
                const connection = yield database_1.default.connect();
                const sql = `SELECT * FROM users WHERE id = ${id}`;
                const result = yield connection.query(sql);
                connection.release();
                console.log(result.rowCount);
                if (result.rowCount === 0) {
                    errorMessage = `User with id = ${id} is not found`;
                    throw new Error(errorMessage);
                }
                else
                    return result.rows[0];
            }
            catch (error) {
                throw new Error(errorMessage);
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let errorMessage = 'Internal Server Error';
            try {
                const doesExist = yield checkUserExistsByEmail(email);
                if (doesExist) {
                    const res = yield this.authenticate(email, password);
                    if (res) {
                        const user = yield getUserByEmail(email);
                        return user;
                    }
                    else {
                        errorMessage = 'Incorrect Password';
                        throw new Error(errorMessage);
                    }
                }
                else {
                    errorMessage = 'User not found';
                    throw new Error(errorMessage);
                }
            }
            catch (error) {
                throw new Error(errorMessage);
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let errorMessage = 'Cannot insert into users';
            try {
                const isEmailEmpty = checkEmpty(user.user_email);
                const isPasswordEmpty = checkEmpty(user.user_password);
                const isFirstNameEmpty = checkEmpty(user.firstname);
                const isLastNameEmpty = checkEmpty(user.lastname);
                if (isEmailEmpty ||
                    isPasswordEmpty ||
                    isFirstNameEmpty ||
                    isLastNameEmpty) {
                    errorMessage = 'All fields must be filled';
                    throw new Error(errorMessage);
                }
                user.user_password = bcrypt_1.default.hashSync(user.user_password, parseInt(process.env.SALT_ROUNDS));
                const userExists = yield getUserByEmail(user.user_email);
                if (!userExists)
                    return addUser(user);
                else {
                    errorMessage = 'User already exists';
                    throw new Error(errorMessage);
                }
            }
            catch (error) {
                throw new Error(errorMessage);
            }
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let errorMessage = 'Cannot remove user';
            const userExists = yield checkUserExists(id);
            try {
                if (userExists)
                    deleteUser(id);
                else {
                    errorMessage = 'User not found';
                    throw new Error(errorMessage);
                }
            }
            catch (error) {
                throw new Error(errorMessage);
            }
        });
    }
}
exports.default = UserStore;
