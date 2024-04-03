import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import db from '../config/mongodb';

interface Product {
  name: string;
  description: string;
  price: number;
  images: string[];
}

export const postProduct = async (req: Request, res: Response) => {  
  try {
    const { name, description, price, images }: Product = req.body;
    const product = { name, description, price, images };
    const result = await db.collection('products').insertOne(product);

    if (!result.acknowledged) {
      return res.status(500).json({message: 'Failed to create product'});
    }
  
    res.status(201).json({message: 'Product created', product});
  } catch (error) {
    res.status(500).json({message: 'Failed to create product'});
  }
}

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await db.collection('products').find().toArray();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message: 'Failed to fetch products'});
  }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await db.collection('products').findOne({ _id: new ObjectId(id.trim()) });
  
    if (!product) {
      return res.status(404).json({message: 'Product not found'});
    }
  
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message: 'Failed to fetch product'});
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, images }: Product = req.body;
    const product = { name, description, price, images };
    const result = await db.collection('products').updateOne({ _id: new ObjectId(id.trim()) }, { $set: product });
  
    if (!result.acknowledged) {
      return res.status(500).json({message: 'Failed to update product'});
    }
  
    res.status(200).json({message: 'Product updated', product});
  } catch (error) {
    res.status(500).json({message: 'Failed to update product'});
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await db.collection('products').deleteOne({ _id: new ObjectId(id.trim()) });
  
    if (!result.acknowledged) {
      return res.status(500).json({message: 'Failed to delete product'});
    }
  
    res.status(200).json({message: 'Product deleted'});
  } catch (error) {
    res.status(500).json({message: 'Failed to delete product'});
  }
}