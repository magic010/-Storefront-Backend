"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UsersModel {
    async index() {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT id, firstName, lastName FROM users';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Failed to get the users with the following error: ${error}`);
        }
    }
    async show(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT id, firstName, lastName FROM users WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Failed to get the user with the following error: ${error}`);
        }
    }
    async create(firstName, lastName, password) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'INSERT INTO users (firstName,lastName,password) VALUES($1, $2, $3) RETURNING id, firstName, lastName ';
            const hash = bcrypt_1.default.hashSync(password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS));
            const result = await connection.query(sql, [firstName, lastName, hash]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Failed to add the user with the following error: ${error}`);
        }
    }
    async update(id, firstName, lastName, password) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'UPDATE users SET firstName=($2), lastName=($3), password=($4)  WHERE id=($1) RETURNING id, firstName, lastName';
            const hash = bcrypt_1.default.hashSync(password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS));
            const result = await connection.query(sql, [
                id,
                firstName,
                lastName,
                hash,
            ]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Failed to update user with the following error: ${error}`);
        }
    }
    async delete(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING id, firstName, lastName';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Failed to delete user with the following error: ${error}`);
        }
    }
}
exports.UsersModel = UsersModel;
