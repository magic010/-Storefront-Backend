"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const verifyAuthToken_1 = require("../middleware/verifyAuthToken");
const products = new products_1.ProductsModel();
const getAllProducts = async (req, res) => {
    try {
        const getProducts = await products.index();
        res.send(getProducts);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
const getProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const product = await products.show(id);
        res.send(product);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
const createProduct = async (req, res) => {
    try {
        const { name, price } = req.body;
        const newProduct = await products.create(name, price);
        res.send(newProduct);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
const updateProduct = async (req, res) => {
    try {
        const { id, name, price } = req.body;
        const updatedProduct = await products.update(id, name, price);
        res.send(updatedProduct);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
const deleteProduct = async (req, res) => {
    try {
        const id = req.body.id;
        const deletedProduct = await products.delete(id);
        res.send(deletedProduct);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
const products_routes = (app) => {
    app.get('/products', getAllProducts);
    app.get('/product/:id', getProduct);
    app.post('/product', verifyAuthToken_1.verifyAuthToken, createProduct);
    app.put('/product', verifyAuthToken_1.verifyAuthToken, updateProduct);
    app.delete('/product', verifyAuthToken_1.verifyAuthToken, deleteProduct);
};
exports.default = products_routes;
