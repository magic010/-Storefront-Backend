"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.default);
const newUser = {
    firstName: 'first',
    lastName: 'last',
    password: '12345678',
};
const token = jsonwebtoken_1.default.sign(newUser, process.env.TOKEN_SECRET);
// upload a new user before all tests
beforeAll(async () => {
    const response = await request.post('/user').send({
        firstName: 'first',
        lastName: 'last',
        password: '12345678',
    });
    response.statusCode == 200 ? console.log('added user') : console.log('error');
});
describe('Testing Users Endpoints.', () => {
    it('GET /users without providing a token', async () => {
        const response = await request.get('/users');
        expect(response.status).toBe(401);
    });
    it('GET /users with providing a token', async () => {
        const response = await request
            .get('/users')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it('GET /user/:id without providing a token', async () => {
        const response = await request.get('/user/1');
        expect(response.status).toBe(401);
    });
    it('GET /user/:id with providing a token', async () => {
        const response = await request
            .get('/user/1')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it('POST /user', async () => {
        const response = await request.post('/user').send({
            firstName: 'first',
            lastName: 'last',
            password: '12345678',
        });
        expect(response.status).toBe(200);
    });
    it('PUT /user without providing a token', async () => {
        const response = await request.put('/user').send({
            id: 1,
            firstName: 'update',
            lastName: 'update',
            password: 'update',
        });
        expect(response.status).toBe(401);
    });
    it('PUT /user with providing a token', async () => {
        const response = await request
            .put('/user')
            .send({
            id: 1,
            firstName: 'update',
            lastName: 'update',
            password: 'update',
        })
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it('DELETE /user without providing a token', async () => {
        const response = await request.delete('/user').send({
            id: 1,
        });
        expect(response.status).toBe(401);
    });
    it('fetch user by id', async () => {
        const response = await request
            .get('/user/1')
            .set('Authorization', `Bearer ${token}`);
        console.log(response.body);
        expect(response.body.id).toBe(1);
    });
    // it('DELETE /user with providing a token', async () => {
    //   const response = await request
    //     .delete('/user')
    //     .send({
    //       id: 1,
    //     })
    //     .set('Authorization', `Bearer ${token}`);
    //   expect(response.status).toBe(200);
    // });
});
