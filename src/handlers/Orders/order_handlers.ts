import express from 'express';
import { Request, Response } from 'express';
import {
  Order,
  OrderProduct,
  OrderStore,
  Status,
} from '../../models/order.model';
import jwt from 'jsonwebtoken';
import { checkAuthHeader } from '../../middlewares/token-verification';
const store = new OrderStore();
export const orderRoutes = (app: express.Application): void => {
  app.get('/api/orders', checkAuthHeader, index);
  app.get('/api/order/:id', checkAuthHeader, show);
  app.post('/api/order', checkAuthHeader, create);
  app.post('/api/orders/:id/products', checkAuthHeader, addProduct);
  app.get('/api/orders/complete/:id', checkAuthHeader, completeOrder);
};
const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await store.index();
    res.json({
      message: 'success',
      orders,
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
    const products = req.body.products as unknown as OrderProduct[];
    const user_id = req.body.user_id as unknown as number;

    if (products === undefined || user_id === undefined) {
      console.log(products);
      res.status(400);
      res.send('All fields must be filled');
      return;
    }
    const order: Order = await store.create({
      products,
      status: Status.ACTIVE,
      user_id,
    });
    res.json({
      message: 'success',
      order,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as unknown as number;
    const order = await store.show(id);
    res.json({
      message: 'success',
      order,
    });
  } catch (error) {
    res.status(400).json(error);
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
    if (error instanceof Error)
      res.status(400).json({
        status: 400,
        message: error.message,
      });
  }
};

const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = req.params.id as unknown as number;
    const productId = req.body.product_id as unknown as number;
    const quantity = req.body.quantity as unknown as number;
    console.log(orderId, productId, quantity);
    const addedProduct = await store.addProduct(orderId, quantity, productId);
    res.json({
      message: 'success',
    });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({
        status: 500,
        message: error.message,
      });
  }
};
