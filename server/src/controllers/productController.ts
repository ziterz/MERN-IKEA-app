import { RequestHandler, Request, Response, NextFunction } from 'express';
import { Product } from '../models/Product.model';
import { Category } from '../models/Category.model';

/**
 * @route   POST api/products
 * @desc    Add a new product
 * @access  Private
 */

export const addProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price, stock, images, category } = req.body;

    if (!category.match(/^[0-9a-fA-F]{24}$/)) {
      throw { name: 'BadRequest', message: 'Invalid category id' };
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      images,
      category,
    }).then((product) => product.populate('category'));

    res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route   GET api/products
 * @desc    Get all products
 * @access  Public
 */

export const getProducts: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find().populate('category');

    res.status(200).json({ products });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route   GET api/products/:id
 * @desc    Get product by id
 * @access  Public
 */

export const getProductById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw { name: 'BadRequest', message: 'Invalid product id' };
    }

    const product = await Product.findById(id).populate('category');

    if (!product) {
      throw { name: 'NotFound', message: 'Product not found' };
    }

    res.status(200).json(product);
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route   PUT api/products/:id
 * @desc    Update product by id
 * @access  Private
 */

export const updateProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, images, category } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw { name: 'BadRequest', message: 'Invalid product id' };
    }

    if (!category.match(/^[0-9a-fA-F]{24}$/)) {
      throw { name: 'BadRequest', message: 'Invalid category id' };
    }

    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      throw { name: 'NotFound', message: 'Category not found' };
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price, stock, images, category },
      { runValidators: true, new: true }
    ).populate('category');

    if (!product) {
      throw { name: 'NotFound', message: 'Product not found' };
    }

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route   DELETE api/products/:id
 * @desc    Delete product by id
 * @access  Private
 */

export const deleteProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw { name: 'BadRequest', message: 'Invalid product id' };
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      throw { name: 'NotFound', message: 'Product not found' };
    }

    res.status(200).json({ message: `Product with id ${id} deleted`, product });
  } catch (err: any) {
    next(err);
  }
};
