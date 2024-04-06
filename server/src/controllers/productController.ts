import { Request, Response } from 'express';
import { Product } from '../models/Product.model';

export const addProduct = async (req: Request, res: Response) => {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();

    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      throw { name: 'NotFound', message: 'Product not found' };
    }

    res.status(200).json(product);
  } catch (error: any) {
    console.log(error);
    if (error.name === 'NotFound') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      throw { name: 'NotFound', message: 'Product not found' };
    }

    res.status(200).json({ message: `Product with id ${id} deleted`, product });
  } catch (error: any) {
    console.log(error);
    if (error.name === 'NotFound') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};
