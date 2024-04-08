import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.name);
  switch (err.name) {
    case 'ValidationError':
    case 'BadRequest':
      return res.status(400).json({ message: err.message });
    case 'Unauthorized':
      return res.status(401).json({ message: 'Unauthorized' });
    case 'Forbidden':
      return res.status(403).json({ message: 'Forbidden access' });
    case 'NotFound':
      return res.status(404).json({ message: err.message });
    default:
      return res.status(500).json({ message: 'Internal server error' });
  }
};
