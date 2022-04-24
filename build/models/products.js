"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModel = void 0;
const database_1 = __importDefault(require("../database"));
class ProductsModel {
    async index() {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Failed to get the products with the following error: ${error}`);
        }
    }
    async show(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Failed to get the product with the following error: ${error}`);
        }
    }
    async create(name, price) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'INSERT INTO products (name,price) VALUES($1, $2) RETURNING *';
            const result = await connection.query(sql, [name, price]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Failed to add the product with the following error: ${error}`);
        }
    }
    async update(id, name, price) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'UPDATE products SET name=($2), price=($3) WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [id, name, price]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Failed to update product with the following error: ${error}`);
        }
    }
    async delete(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Failed to delete product with the following error: ${error}`);
        }
    }
}
exports.ProductsModel = ProductsModel;
