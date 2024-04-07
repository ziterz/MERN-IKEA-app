import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/User.model';

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies['auth_token'];

    if (!token) {
      throw { name: 'Unauthorized' };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
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
