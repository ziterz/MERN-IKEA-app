import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/Product.model';

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price, stock, images } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      images,
    });

    res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find();

    res.status(200).json({ products });
  } catch (err: any) {
    next(err);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      throw { name: 'NotFound', message: 'Product not found' };
    }

    res.status(200).json(product);
  } catch (err: any) {
    next(err);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, images } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price, stock, images },
      { new: true }
    );

    if (!product) {
      throw { name: 'NotFound', message: 'Product not found' };
    }

    res.status(200).json({ message: 'Product updated', product });
  } catch (err: any) {
    next(err);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      throw { name: 'NotFound', message: 'Product not found' };
    }

    res.status(200).json({ message: `Product with id ${id} deleted`, product });
  } catch (err: any) {
    next(err);
  }
};
