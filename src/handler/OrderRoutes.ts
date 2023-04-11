import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/Order';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const results = await store.index();
  res.json(results);
};

const show = async (req: Request, res: Response) => {
  const data = await store.show(req.params.id);
  if (!data) {
    res.status(404).json({ message: 'Data not found' });
    return;
  }
  res.json(data);
};

const create = async (req: Request, res: Response) => {
  try {
    const data: Order = {
      id: null,
      items: req.body.items,
      userId: req.body.userId,
      status: 'Active',
    };

    const newData = await store.create(data);
    res.json(newData);
  } catch (err: unknown) {
    res.status(400);
    res.json({ message: (err as Error)?.message });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.params.id);
    res.json(deleted);
  } catch (err: unknown) {
    res.status(400);
    res.json({ message: (err as Error)?.message });
  }
};

const addProduct = async (req: Request, res: Response) => {
  const orderId: string = req.params.id;
  const productId: string = req.body.productId;
  const quantity: number = parseInt(req.body.quantity);

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err: unknown) {
    res.status(400);
    res.json({ message: (err as Error)?.message });
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('users/:id/orders', index);
  app.get('/orders/:id', show);
  app.post('/orders', create);
  app.delete('/orders/:id', destroy);
  app.post('/orders/:id/products', addProduct);
};

export default orderRoutes;
