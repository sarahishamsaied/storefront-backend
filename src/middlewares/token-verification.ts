import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
export function checkAuthHeader(
  req: Request,
  res: Response,
  next: NextFunction
): void | boolean {
  if (!req.headers.authorization) {
    res.status(401);
    console.log('access denied');

    res.json('Access denied, invalid token');

    return false;
  }
  try {
    const token = req.headers.authorization.slice(7);
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    next();
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return false;
  }
}
