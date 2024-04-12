import { RequestHandler, Request, Response, NextFunction } from 'express';

export const getOrders: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const getOrderById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
