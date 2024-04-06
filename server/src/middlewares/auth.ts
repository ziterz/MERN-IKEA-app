import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/User.model';

interface RequestWithUserId extends Request {
  userId: string;
}

const verifyToken = async (
  req: RequestWithUserId,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies['auth_token'];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.userId = (decoded as JwtPayload).userId;

    const user = await User.findById(req.userId);
    if (!user?.isModified('password')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default verifyToken;
