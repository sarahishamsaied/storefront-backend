import { Request, Response } from 'express';
import express from 'express';
import ProductStore from '../../models/product.model';
import jwt from 'jsonwebtoken';
import { checkAuthHeader } from '../../middlewares/token-verification';
const store = new ProductStore();
const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await store.index();
    res.json({
      message: 'success',
      products,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const product = await store.show(id);
    product
      ? res.json({
          message: 'success',
          product,
        })
      : res.status(400).json({
          message: 'Cannot find product',
        });
  } catch (error) {
    res.status(400).json(error);
  }
};
const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.body;
    const product = await store.create(user);
    res.json({
      product,
      status: 'success',
    });
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({
        message: error.message,
        status: 500,
      });
  }
};
const showByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cat } = req.params;
    const response = await store.showByCategory(cat);
    response.length > 0
      ? res.json({
          data: response,
          message: 'success',
          status: 200,
        })
      : res.status(400).json({
          message: 'Cannot find product(s)',
          status: 400,
        });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal Server Error',
      status: 500,
    });
  }
};
const remove = async (req: Request, res: Response): Promise<void> => {
  const id: string = req.params.id;
  try {
    const response = await store.delete(id);
    console.log(response);
    res.json({
      message: 'success',
    });
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({
        message: error.message,
      });
  }
};
const productRoutes = (app: express.Application) => {
  app.get('/api/products', index);
  app.post('/api/product', checkAuthHeader, create);
  app.get('/api/product/:id', show);
  app.delete('/api/product/:id', checkAuthHeader, remove);
  app.get('/api/product/category/:cat', checkAuthHeader, showByCategory);
};
export default productRoutes;
