import express, { Router } from 'express';
import * as controllers from '../controllers/productController';
import { authentication } from '../middlewares/auth';

const product: Router = express.Router();

product.post('/', controllers.addProduct);
product.get('/', authentication, controllers.getProducts);
product.get('/:id', controllers.getProductById);
product.put('/:id', controllers.updateProduct);
product.delete('/:id', controllers.deleteProduct);

export default product;
