import { RequestHandler, Request, Response, NextFunction } from 'express';
import { Product } from '../models/Product.model';
import { Cart } from '../models/Cart.model';
import { User } from '../models/User.model';
import { IProduct } from '../interfaces/IProduct';
import { ICart } from '../interfaces/ICart';
import { Order } from '../models/Order.model';

export const addToCart: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      throw { name: 'BadRequest', message: 'Invalid product id' };
    }

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

    const cart: ICart | null = await Cart.findOne({ user: req.userId });

    if (!cart) {
      await Cart.create({
        user: req.userId,
        items: [{ product, quantity }],
      });
    } else {
      if (cart.items.some((item) => item.product == productId)) {
        await Cart.updateOne(
          {
            user: req.userId,
            'items.product': productId,
          },
          {
            $inc: { 'items.$.quantity': quantity },
          }
        );
      } else {
        await Cart.updateOne(
          { user: req.userId },
          {
            $push: { items: { product, quantity } },
          }
        );
      }
    }

    return res.status(200).json({
      message: 'Product added to cart successfully',
    });
  } catch (err: any) {
    next(err);
  }
};

export const getCart: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cart: ICart | null = await Cart.findOne({
      user: req.userId,
    }).populate({
      path: 'items.product',
      populate: {
        path: 'category',
      },
    });

    if (!cart) {
      throw { name: 'NotFound', message: 'Cart not found' };
    }

    return res.status(200).json(cart);
  } catch (err: any) {
    next(err);
  }
};

export const updateCart: RequestHandler = async (
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

    const cart: ICart | null = await Cart.findOne({ user: req.userId });

    if (!cart) {
      throw { name: 'NotFound', message: 'Cart not found' };
    }

    if (quantity <= 0) {
      await Cart.updateOne(
        { user: req.userId },
        {
          $pull: { items: { product: productId } },
        }
      );
    } else {
      await Cart.updateOne(
        {
          user: req.userId,
          'items.product': productId,
        },
        {
          $set: { 'items.$.quantity': quantity },
        }
      );
    }

    return res.status(200).json({
      message: 'Cart updated successfully',
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteCart: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cart: ICart | null = await Cart.findOne({ user: req.userId });

    if (!cart) {
      throw { name: 'NotFound', message: 'Cart not found' };
    }

    await Cart.deleteOne({ user: req.userId });

    return res.status(200).json({
      message: 'Cart deleted successfully',
    });
  } catch (err: any) {
    next(err);
  }
};

export const checkout: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await Cart.startSession();
  session.startTransaction();

  try {
    const user: any = await User.findById(req.userId);

    if (!user) {
      throw { name: 'NotFound', message: 'User not found' };
    }

    const cart: ICart | null = await Cart.findOne({
      user: req.userId,
    }).populate('items.product');

    if (!cart) {
      throw { name: 'NotFound', message: 'Cart not found' };
    }

    const products = cart.items.map((item) => item.product);

    for (let i = 0; i < products.length; i++) {
      const product = products[i];

      if (product.stock < cart.items[i].quantity) {
        await Cart.updateOne(
          { user: req.userId },
          {
            $pull: { items: { product: product._id } },
          }
        );

        throw {
          name: 'BadRequest',
          message: 'Product is out of stock',
        };
      }

      await Product.updateOne(
        { _id: product._id },
        {
          $inc: { stock: -cart.items[i].quantity },
        }
      );
    }

    const total = cart.items.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    await Order.create({
      user: req.userId,
      items: cart.items,
      totalPrice: total,
      status: 'pending',
      createdAt: new Date(),
    });

    await Cart.deleteOne({ user: req.userId });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      message: `Checkout successful, please do payment with Rp${total}`,
    });
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();

    next(err);
  }
};
