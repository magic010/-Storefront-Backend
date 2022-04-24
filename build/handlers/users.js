"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthToken_1 = require("../middleware/verifyAuthToken");
const users = new users_1.UsersModel();
const getAllUsers = async (req, res) => {
    try {
        const getUsers = await users.index();
        res.send(getUsers);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
const getUser = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const user = await users.show(id);
        res.send(user);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
const createUser = async (req, res) => {
    try {
        const { firstName, lastName, password } = req.body;
        const newUser = await users.create(firstName, lastName, password);
        const token = jsonwebtoken_1.default.sign(newUser, process.env.TOKEN_SECRET);
        res.status(200).json(token);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
const updateUser = async (req, res) => {
    try {
        const { id, firstName, lastName, password } = req.body;
        const updatedUser = await users.update(id, firstName, lastName, password);
        res.send(updatedUser);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
const deleteUser = async (req, res) => {
    try {
        const id = req.body.id;
        const deletedUser = await users.delete(id);
        res.send(deletedUser);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
const users_routes = (app) => {
    app.get('/users', verifyAuthToken_1.verifyAuthToken, getAllUsers);
    app.get('/user/:id', verifyAuthToken_1.verifyAuthToken, getUser);
    app.post('/user', createUser);
    app.put('/user', verifyAuthToken_1.verifyAuthToken, updateUser);
    app.delete('/user', verifyAuthToken_1.verifyAuthToken, deleteUser);
};
exports.default = users_routes;
