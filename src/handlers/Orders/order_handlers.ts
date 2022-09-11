import express from 'express';
import { Request, Response } from 'express';
import { OrderStore, Status } from '../../models/order.model';
import jwt from 'jsonwebtoken';
const store = new OrderStore();
export const orderRoutes = (app: express.Application): void => {
  app.get('/api/orders', index);
  app.get('/api/order/:id', show);
  app.post('/api/order', create);
  app.post('/api/orders/:id/products', addProduct);
  app.get('/api/orders/user/:uid', showUserOrders);
  app.get('/api/orders/complete/:id', completeOrder);
};
const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await store.index();
    const token = jwt.sign({ orders }, process.env.TOKEN_SECRET as string);
    res.json({
      message: 'success',
      token,
    });
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({
        message: error.message,
      });
  }
};
const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.body.user_id;
    const response = await store.create(userId, Status.ACTIVE);
    res.json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      res.status(500).json({
        status: 500,
        message: error.message,
      });
  }
};
const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const order = await store.show(id);
    const token = jwt.sign({ order }, process.env.TOKEN_SECRET as string);
    res.json({
      message: 'success',
      token,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      res.status(400).json({
        message: error.message,
      });
  }
};
const completeOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const response = await store.completeOrder(id);
    console.log(response);
    res.json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      res.status(400).json({
        status: 400,
        message: error.message,
      });
  }
};
const showUserOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.params.uid;
    const orders = await store.showUserOrders(userId);
    const token = jwt.sign({ orders }, process.env.TOKEN_SECRET as string);
    res.json({ message: 'success', token });
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      res.status(500).json({
        status: 500,
        message: error.message,
      });
  }
};
const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId: string = req.params.id;
    const productId: string = req.body.product_id;
    const quantity: number = parseInt(req.body.quantity);
    console.log(orderId, productId, quantity);
    const addedProduct = await store.addProduct(orderId, quantity, productId);
    res.json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      res.status(500).json({
        status: 500,
        message: error.message,
      });
  }
};
