import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { Product } from '../models/Product.model';
import { Cart } from '../models/Cart.model';

export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    const product = await Product.findById(productId);

    if (!product) {
      throw { name: 'NotFound', message: 'Product not found' };
    }

    const stock = await Product.findById(productId).where('stock').gt(0);

    if (!stock) {
      throw { name: 'BadRequest', message: 'Product is out of stock' };
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      await Cart.create({
        user: userId,
        items: [{ product, quantity }],
      });
    } else {
      const productInCart = await Cart.findOne({ user: userId })
        .where('items')
        .where('product')
        .equals(productId);

      console.log(productInCart);
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
