import express, { Router } from 'express';
import * as controllers from '../controllers/cartController';

const cart: Router = express.Router();

cart.post('/', controllers.addToCart);
cart.get('/', controllers.getCart);
cart.patch('/:id', controllers.updateCart);
cart.delete('/:id', controllers.deleteCart);
cart.post('/checkout', controllers.checkout);

export default cart;
