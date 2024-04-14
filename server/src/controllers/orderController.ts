import { RequestHandler, Request, Response, NextFunction } from 'express';
import { Order } from '../models/Order.model';

export const getOrders: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.find()
      .populate('user', '-password')
      .populate({
        path: 'items.product',
        populate: {
          path: 'category',
        },
      });

    res.status(200).json({ orders });
  } catch (err: any) {
    next(err);
  }
};

export const getOrderById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw { name: 'BadRequest', message: 'Invalid order id' };
    }

    const order = await Order.findById(id)
      .populate('user', '-password')
      .populate({
        path: 'items.product',
        populate: {
          path: 'category',
        },
      });

    if (!order) {
      throw { name: 'NotFound', message: 'Order not found' };
    }

    res.status(200).json(order);
  } catch (err: any) {
    next(err);
  }
};
