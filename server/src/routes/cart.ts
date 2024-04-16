import express, { Router } from 'express';
import * as controllers from '../controllers/cartController';
import { authenticateUser, authorizeUser } from '../middlewares/auth';

const cart: Router = express.Router();

cart.post('/', authenticateUser, authorizeUser, controllers.addToCart);
cart.get('/', authenticateUser, authorizeUser, controllers.getCart);
cart.patch('/', authenticateUser, authorizeUser, controllers.updateCart);
cart.delete('/:id', authenticateUser, authorizeUser, controllers.deleteCart);
cart.post('/checkout', authenticateUser, authorizeUser, controllers.checkout);

export default cart;
