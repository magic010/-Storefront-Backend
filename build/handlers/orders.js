"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const verifyAuthToken_1 = require("../middleware/verifyAuthToken");
const orders = new orders_1.OrdersModel();
const getAllOrders = async (req, res) => {
    try {
        const getOrders = await orders.index();
        res.status(200).send(getOrders);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
const getOrder = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const order = await orders.show(id);
        res.status(200).send(order);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
const createOrder = async (req, res) => {
    try {
        const { status, userId } = req.body;
        const newOrder = await orders.create(status, userId);
        res.status(200).send(newOrder);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
const updateOrder = async (req, res) => {
    try {
        const { id, status } = req.body;
        const updatedOrder = await orders.update(id, status);
        res.status(200).send(updatedOrder);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
const deleteOrder = async (req, res) => {
    try {
        const id = req.body.id;
        const deletedOrder = await orders.delete(id);
        res.status(200).send(deletedOrder);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
const addProduct = async (_req, res) => {
    const orderId = _req.params.id;
    const productId = _req.body.productId;
    const quantity = parseInt(_req.body.quantity);
    try {
        const addedProduct = await orders.addProduct(quantity, orderId, productId);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const orders_routes = (app) => {
    app.get('/orders', verifyAuthToken_1.verifyAuthToken, getAllOrders);
    app.get('/order/:id', verifyAuthToken_1.verifyAuthToken, getOrder);
    app.post('/order', verifyAuthToken_1.verifyAuthToken, createOrder);
    app.put('/order', verifyAuthToken_1.verifyAuthToken, updateOrder);
    app.delete('/order', verifyAuthToken_1.verifyAuthToken, deleteOrder);
    // add product in order
    app.post('/orders/:id/products', verifyAuthToken_1.verifyAuthToken, addProduct);
};
exports.default = orders_routes;
