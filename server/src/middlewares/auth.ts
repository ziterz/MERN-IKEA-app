import { RequestHandler, Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User/User.model';
import { verifyToken } from '../utils/jwt';

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const authenticateUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies['auth_token'];

    if (!token) {
      throw { name: 'Unauthorized' };
    }

    const decoded = verifyToken(token);
    req.userId = (decoded as JwtPayload).userId;
    const user = await User.findById(req.userId);

    if (!user) {
      throw { name: 'Unauthorized' };
    }

    next();
  } catch (err: any) {
    next(err);
  }
};

export const authorizeUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || user.role !== 'user') {
      throw { name: 'Forbidden' };
    }

    next();
  } catch (err: any) {
    next(err);
  }
};

export const authorizeAdmin: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || user.role !== 'admin') {
      throw { name: 'Forbidden' };
    }

    next();
  } catch (err: any) {
    next(err);
  }
};
