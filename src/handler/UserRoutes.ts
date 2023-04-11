import express, { Request, Response } from 'express';
import { validatePassword, validateUsername } from '../helper/validator';
import { User, UserStore } from '../models/User';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const results = await store.index();
    results.forEach((t) => (t.password = '******'));
    res.json(results);
  } catch (err) {
    res.status(400);
    res.json({ message: `${err}` });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const data = await store.show(req.params.id);
    if (!data) {
      res.status(404).json({ message: 'Data not found' });
      return;
    }
    data.password = '******';
    res.json(data);
  } catch (err) {
    res.status(400);
    res.json({ message: `${err}` });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const data: User = {
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      id: undefined,
    };

    if (!data.username || !data.password || !data.firstName || !data.lastName) {
      throw new Error(
        'username, password, firstName and lastName must be required'
      );
    }

    let validate = validateUsername(data.username);
    if (validate) {
      throw new Error(validate);
    }
    validate = validatePassword(data.username);
    if (validate) {
      throw new Error(validate);
    }

    const newData = await store.create(data);
    newData.password = '******';
    res.json(newData);
  } catch (err) {
    res.status(400);
    res.json({ message: `${err}` });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json({ message: `${err}` });
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users', create);
  app.delete('/users/:id', destroy);
};

export default userRoutes;