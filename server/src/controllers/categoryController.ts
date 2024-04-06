import { Request, Response } from 'express';
import { Category } from '../models/Category.model';

export const addCategory = async (req: Request, res: Response) => {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();

    res.status(200).json({ categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      throw { name: 'NotFound', message: 'Category not found' };
    }

    res.status(200).json(category);
  } catch (error: any) {
    console.log(error);
    if (error.name === 'NotFound') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, image },
      { new: true }
    );

    if (!category) {
      throw { name: 'NotFound', message: 'Category not found' };
    }

    res.status(200).json({
      message: 'Category updated successfully',
      category,
    });
  } catch (error: any) {
    console.log(error);
    if (error.name === 'NotFound') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      throw { name: 'NotFound', message: 'Category not found' };
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error: any) {
    console.log(error);
    if (error.name === 'NotFound') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};
