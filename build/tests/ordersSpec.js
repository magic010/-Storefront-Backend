"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const request = (0, supertest_1.default)(server_1.default);
const newUser = {
    firstName: 'first',
    lastName: 'last',
    password: '12345678',
};
const token = jsonwebtoken_1.default.sign(newUser, process.env.TOKEN_SECRET);
describe('Testing orders Endpoints.', () => {
    it('GET /orders without a token', async () => {
        const response = await request.get('/orders');
        expect(response.status).toBe(401);
    });
    it('GET /orders with a token', async () => {
        const response = await request
            .get('/orders')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it('GET /order/:id without a token ', async () => {
        const response = await request.get('/order/1');
        expect(response.status).toBe(401);
    });
    it('GET /order/:id with a token ', async () => {
        const response = await request
            .get('/order/1')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it('POST /order without a token', async () => {
        const response = await request.post('/order').send({
            status: 'test',
            userId: 1,
        });
        expect(response.status).toBe(401);
    });
    it('POST /order with a token', async () => {
        const response = await request
            .post('/order')
            .send({
            status: 'test',
            userId: 1,
        })
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it('PUT /order without providing a token', async () => {
        const response = await request.put('/order').send({
            id: 1,
            status: 'update',
            userId: 1,
        });
        expect(response.status).toBe(401);
    });
    it('PUT /order with providing a token', async () => {
        const response = await request
            .put('/order')
            .send({
            id: 1,
            status: 'update',
            userId: 1,
        })
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it('DELETE /order without providing a token', async () => {
        const response = await request.delete('/order').send({
            id: 1,
        });
        expect(response.status).toBe(401);
    });
    it('DELETE /order with providing a token', async () => {
        const response = await request
            .delete('/order')
            .send({
            id: 1,
        })
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
});
