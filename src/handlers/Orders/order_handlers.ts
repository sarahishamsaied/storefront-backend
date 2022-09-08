import express from 'express';
import { Request, Response } from 'express';
import { OrderStore, Status } from '../../models/order.model';
const store = new OrderStore();
export const orderRoutes = (app: express.Application): void => {
  app.get('/api/orders', index);
  app.post('/api/order', create);
  app.post('/api/orders/:id/products', addProduct);
};
const index = async (req: Request, res: Response): Promise<void> => {
  const response = await store.index();
  res.json({
    response,
  });
};
const create = async (req: Request, res: Response): Promise<void> => {
  const userId: string = req.body.userId;
  console.log(Status.ACTIVE);
  const response = await store.create(userId, Status.ACTIVE);
  res.json({
    response,
  });
};
const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId: string = req.params.id;
    const productId: string = req.body.productId;
    const quantity: number = parseInt(req.body.quantity);
    console.log(orderId, productId, quantity);
    const addedProduct = await store.addProduct(orderId, quantity, productId);
    res.json(addedProduct);
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({
        status: 500,
        message: error.message,
      });
  }
};
