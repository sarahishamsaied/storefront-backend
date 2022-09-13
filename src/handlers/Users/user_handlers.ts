import UserStore, { BaseUser, User } from '../../models/user.model';
import { Request, Response } from 'express';
import express from 'express';
import jwt from 'jsonwebtoken';
const store = new UserStore();
const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await store.index();
    const token = jwt.sign(
      { users: users },
      process.env.TOKEN_SECRET as string
    );
    res.json({
      status: 200,
      token,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const firstname = req.body.firstname as unknown as string;
    const lastname = req.body.lastname as unknown as string;
    const user_email = req.body.user_email as unknown as string;
    const user_password = req.body.user_password as unknown as string;
    const user: BaseUser = {
      firstname,
      lastname,
      user_email,
      user_password,
    };
    const newUser = await store.create(user);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as string
    );
    res.json({
      status: 200,
      message: 'success',
      token,
    });
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    res.status(400).json({
      message,
    });
  }
};
const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const result = await store.remove(id);
    res.status(200).json({
      status: 200,
      removed: 'success',
      result,
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(400).json({ status: 400, message: err.message });
    else console.log('err' + err);
  }
};
//removing update temporarly
// const update = async (req: Request, res: Response) => {
//   try {
//     const id: number = parseInt(req.params.id);
//     console.log(id);
//     const updated_user = await store.update(id);
//     res.status(200).json({
//       status: 200,
//       message: 'succeess',
//       updated_user,
//     });
//   } catch (error) {
//     if (error instanceof Error)
//       res.status(400).json({ status: 400, message: error.message });
//     else console.log('err' + error);
//   }
// };
const login = async (req: Request, res: Response) => {
  try {
    const { user_email, user_password } = req.body;
    const foundUser = await store.login(user_email, user_password);
    const token = jwt.sign(
      { user: foundUser },
      process.env.TOKEN_SECRET as string
    );
    res.json({
      status: 200,
      message: 'succeess',
      token,
    });
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({
        message: error.message,
      });
  }
};
const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const user = await store.getUser(id);
    const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
    res.json({
      status: 200,
      token,
    });
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({ message: error.message });
  }
};
const userRoutes = (app: express.Application) => {
  app.get('/api/users', index);
  app.get('/api/user/:id', show);
  app.post('/api/auth/signup', create);
  app.delete('/api/user/:id', remove);
  // app.patch('/api/user/:id', update);
  app.post('/api/auth/signin', login);
};
export default userRoutes;
