import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { Product } from '../models/Product.model';
import { Cart } from '../models/Cart.model';
import { User } from '../models/User.model';
import { IProduct } from '../interfaces/IProduct';
import { ICart } from '../interfaces/ICart';

export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, quantity } = req.body;

    const product: IProduct | null = await Product.findById(productId);

    if (!product) {
      throw { name: 'NotFound', message: 'Product not found' };
    }

    const checkStock: IProduct | null = await Product.findById(productId)
      .where('stock')
      .gt(0);

    if (!checkStock) {
      throw { name: 'BadRequest', message: 'Product is out of stock' };
    }

    const cart = await Cart.findOne({ user: req.userId });
    console.log(cart);

    if (!cart) {
      await Cart.create({
        user: req.userId,
        items: [{ product, quantity }],
      });
    } else {
      await Cart.findOneAndUpdate(
        {
          user: req.userId,
          items: { $elemMatch: { product: productId } },
        },
        {
          $inc: { 'items.$.quantity': quantity },
        }
      );
    }

    return res.status(201).json({
      message: 'Product added to cart successfully',
    });
  } catch (err: any) {
    next(err);
  }
};

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const updateCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const deleteCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const checkout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
