import { RequestHandler, Request, Response, NextFunction } from 'express';
import { Category } from '../models/Category.model';

export const addCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, image } = req.body;
    const category = await Category.create({
      name,
      image,
    });

    res.status(201).json({
      message: 'Category created successfully',
      category,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getCategories: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find();

    res.status(200).json({ categories });
  } catch (err) {
    next(err);
  }
};

export const getCategoryById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw { name: 'BadRequest', message: 'Invalid category id' };
    }

    const category = await Category.findById(id);

    if (!category) {
      throw { name: 'NotFound', message: 'Category not found' };
    }

    res.status(200).json(category);
  } catch (err: any) {
    next(err);
  }
};

export const updateCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw { name: 'BadRequest', message: 'Invalid category id' };
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { name, image },
      { runValidators: true }
    );

    if (!category) {
      throw { name: 'NotFound', message: 'Category not found' };
    }

    res.status(200).json({
      message: 'Category updated successfully',
      category,
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw { name: 'BadRequest', message: 'Invalid category id' };
    }

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      throw { name: 'NotFound', message: 'Category not found' };
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err: any) {
    next(err);
  }
};
