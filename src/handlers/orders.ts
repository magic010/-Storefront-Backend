import { OrdersModel } from '../models/orders';
import { Application, Request, Response } from 'express';
import { verifyAuthToken } from '../middleware/verifyAuthToken';

const orders = new OrdersModel();

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const getOrders = await orders.index();
    res.status(200).send(getOrders);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const order = await orders.show(id);
    res.status(200).send(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const { status, userId } = req.body;
    const newOrder = await orders.create(status, userId);
    res.status(200).send(newOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id, status } = req.body;
    const updatedOrder = await orders.update(id, status);
    res.status(200).send(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const deletedOrder = await orders.delete(id);
    res.status(200).send(deletedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id;
  const productId: string = _req.body.productId;
  const quantity: number = parseInt(_req.body.quantity);

  try {
    const addedProduct = await orders.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orders_routes = (app: Application) => {
  app.get('/orders', verifyAuthToken, getAllOrders);
  app.get('/order/:id', verifyAuthToken, getOrder);
  app.post('/order', verifyAuthToken, createOrder);
  app.put('/order', verifyAuthToken, updateOrder);
  app.delete('/order', verifyAuthToken, deleteOrder);
  // add product in order
  app.post('/orders/:id/products', verifyAuthToken, addProduct);
};

export default orders_routes;
