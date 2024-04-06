import express, { Router } from 'express';
import * as controllers from '../controllers/productController';

const product: Router = express.Router();

product.post('/products', controllers.addProduct);
product.get('/products', controllers.getProducts);
product.get('/products/:id', controllers.getProductById);
product.put('/products/:id', controllers.updateProduct);
product.delete('/products/:id', controllers.deleteProduct);

export default product;
