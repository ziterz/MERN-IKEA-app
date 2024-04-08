import express, { Router } from 'express';
import * as controllers from '../controllers/orderController';
import { authentication, authorization } from '../middlewares/auth';

const order: Router = express.Router();

order.get('/', authentication, authorization, controllers.getOrders);
order.get('/:id', authentication, authorization, controllers.getOrderById);

export default order;
