import express, { Router } from 'express';
import * as controllers from '../controllers/productController';
import { authenticateUser, authorizeAdmin } from '../middlewares/auth';

const product: Router = express.Router();

product.post('/', authenticateUser, authorizeAdmin, controllers.addProduct);
product.get('/', controllers.getProducts);
product.get('/:id', controllers.getProductById);
product.put(
  '/:id',
  authenticateUser,
  authorizeAdmin,
  controllers.updateProduct
);
product.delete(
  '/:id',
  authenticateUser,
  authorizeAdmin,
  controllers.deleteProduct
);

export default product;
