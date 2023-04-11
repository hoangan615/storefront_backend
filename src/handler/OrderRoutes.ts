import express, { Request, Response } from 'express';
import verifyToken from '../middleware/verifyToken';
import { Order, OrderStore } from '../models/Order';

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const status = ((req.query.status || '') as string).toLowerCase();
    console.log('status', status);

    if (!userId) {
      res.status(404).json({ message: 'userId is required.' });
      return;
    }
    console.log('status', status);

    if (status && !['active', 'completed'].includes(status)) {
      res.status(400).json({
        message: "status must be ['active', 'completed']",
      });
      return;
    }
    const results = await store.index(userId, status?.toLowerCase());

    res.json(results);
  } catch (err) {
    res.status(400);
    res.json({ message: `${err}` });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const { id, userId } = req.params;
    if (!userId) {
      res.status(404).json({ message: 'userId is required.' });
      return;
    }
    const data = await store.show(userId, id);
    if (!data) {
      res.status(404).json({ message: 'Data not found' });
      return;
    }
    res.json(data);
  } catch (err) {
    res.status(400);
    res.json({ message: `${err}` });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const data: Order = {
      id: null,
      items: req.body.items,
      userId: req.params.userId,
      status: 'active',
    };
    if (!data.userId) {
      res.status(404).json({ message: 'userId is required.' });
      return;
    }

    const newData = await store.create(data);
    res.json(newData);
  } catch (err) {
    res.status(400);
    res.json({ message: `${err}` });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const { id, userId } = req.params;
    if (!userId) {
      res.status(404).json({ message: 'userId is required.' });
      return;
    }
    const deleted = await store.delete(userId, id);
    res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json({ message: `${err}` });
  }
};

const addProduct = async (req: Request, res: Response) => {
  const { id, userId } = req.params;
  const { productId, quantity } = req.body;
  if (!userId) {
    res.status(404).json({ message: 'userId is required.' });
    return;
  }
  if (!id) {
    res.status(400).json({ message: 'orderId is required.' });
    return;
  }
  if (!productId) {
    res.status(400).json({ message: 'productId is required.' });
    return;
  }
  if (quantity <= 0) {
    res.status(400).json({ message: 'quantity is required and more than 0.' });
    return;
  }

  try {
    const addedProduct = await store.addProduct(
      userId,
      id,
      productId,
      quantity
    );
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json({ message: `${err}` });
  }
};

const completeOrder = async (req: Request, res: Response) => {
  const { id, userId } = req.params;
  if (!userId) {
    res.status(404).json({ message: 'userId is required.' });
    return;
  }
  if (!id) {
    res.status(400).json({ message: 'orderId is required.' });
    return;
  }

  try {
    const addedProduct = await store.completeOrder(userId, id);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json({ message: `${err}` });
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/users/:userId/orders', verifyToken, index);
  app.get('/users/:userId/orders/:id', verifyToken, show);
  app.post('/users/:userId/orders', verifyToken, create);
  app.delete('/users/:userId/orders/:id', verifyToken, destroy);
  app.post('/users/:userId/orders/:id/products', verifyToken, addProduct);
  app.post('/users/:userId/orders/:id/complete', verifyToken, completeOrder);
};

export default orderRoutes;
