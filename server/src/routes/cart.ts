import express, { Router } from 'express';
import * as controllers from '../controllers/cartController';
import { authentication, authorization } from '../middlewares/auth';

const cart: Router = express.Router();

cart.post('/', authentication, authorization, controllers.addToCart);
cart.get('/', authentication, authorization, controllers.getCart);
cart.patch('/:id', authentication, authorization, controllers.updateCart);
cart.delete('/:id', authentication, authorization, controllers.deleteCart);
cart.post('/checkout', authentication, authorization, controllers.checkout);

export default cart;
