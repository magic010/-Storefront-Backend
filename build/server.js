"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const users_1 = __importDefault(require("./handlers/users"));
const products_1 = __importDefault(require("./handlers/products"));
const orders_1 = __importDefault(require("./handlers/orders"));
const app = (0, express_1.default)();
//middleware to secure headers information in http requests
app.use((0, helmet_1.default)());
//middleware to parse incoming requests
app.use(express_1.default.json());
const port = process.env.PORT;
app.get('/', async (_req, res) => {
    res.send('Storefront backend APIs');
});
(0, users_1.default)(app);
(0, products_1.default)(app);
(0, orders_1.default)(app);
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
exports.default = app;
