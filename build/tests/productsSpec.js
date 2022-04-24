"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const product = new products_1.ProductsModel();
const request = (0, supertest_1.default)(server_1.default);
const newUser = {
    firstName: 'first',
    lastName: 'last',
    password: '12345678',
};
const token = jsonwebtoken_1.default.sign(newUser, process.env.TOKEN_SECRET);
describe('Testing Products Methods', () => {
    it('A method that get all products', () => {
        expect(product.index).toBeDefined();
    });
    it('A method that get a specific product', () => {
        expect(product.show).toBeDefined();
    });
    it('A method that create a new product', () => {
        expect(product.create).toBeDefined();
    });
    it('A method that update data of a product', () => {
        expect(product.update).toBeDefined();
    });
    it('A method that delete a product', () => {
        expect(product.delete).toBeDefined();
    });
});
describe('Testing products Endpoints.', () => {
    it('GET /products', async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    });
    it('GET /product/:id ', async () => {
        const response = await request.get('/product/1');
        expect(response.status).toBe(200);
    });
    it('POST /product without a token', async () => {
        const response = await request.post('/product').send({
            name: 'test',
            price: 123,
        });
        expect(response.status).toBe(401);
    });
    it('POST /product with a token', async () => {
        const response = await request
            .post('/product')
            .send({
            name: 'test',
            price: 123,
        })
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it('PUT /product without providing a token', async () => {
        const response = await request.put('/product').send({
            id: 1,
            name: 'update',
            price: 321,
        });
        expect(response.status).toBe(401);
    });
    it('PUT /product with providing a token', async () => {
        const response = await request
            .put('/product')
            .send({
            id: 1,
            name: 'update',
            price: 321,
        })
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it('DELETE /product without providing a token', async () => {
        const response = await request.delete('/product').send({
            id: 1,
        });
        expect(response.status).toBe(401);
    });
    it('DELETE /product with providing a token', async () => {
        const response = await request
            .delete('/product')
            .send({
            id: 1,
        })
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
});
