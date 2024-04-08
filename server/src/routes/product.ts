import express, { Router } from 'express';
import * as controllers from '../controllers/productController';
import { authentication, adminOnly } from '../middlewares/auth';

const product: Router = express.Router();

product.post('/', authentication, adminOnly, controllers.addProduct);
product.get('/', controllers.getProducts);
product.get('/:id', controllers.getProductById);
product.put('/:id', authentication, adminOnly, controllers.updateProduct);
product.delete('/:id', authentication, adminOnly, controllers.deleteProduct);

export default product;
