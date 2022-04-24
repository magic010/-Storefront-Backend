"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModel = void 0;
const database_1 = __importDefault(require("../database"));
class OrdersModel {
    async index() {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Failed to get the orders with the following error: ${error}`);
        }
    }
    async show(userId) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE userId=($1)';
            const result = await connection.query(sql, [userId]);
            connection.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Failed to get the order with the following error: ${error}`);
        }
    }
    async create(status, userId) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'INSERT INTO orders (status,userId) VALUES($1, $2) RETURNING *';
            const result = await connection.query(sql, [status, userId]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Failed to add the order with the following error: ${error}`);
        }
    }
    async update(id, status) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'UPDATE orders SET status=($2) WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [id, status]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Failed to update order with the following error: ${error}`);
        }
    }
    async delete(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Failed to delete order with the following error: ${error}`);
        }
    }
    async addProduct(quantity, orderId, productId) {
        try {
            const sql = 'INSERT INTO orders_products (quantity, orderId, productId) VALUES($1, $2, $3) RETURNING *';
            const connection = await database_1.default.connect();
            const result = await connection.query(sql, [
                quantity,
                orderId,
                productId,
            ]);
            const order = result.rows[0];
            connection.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`);
        }
    }
}
exports.OrdersModel = OrdersModel;
