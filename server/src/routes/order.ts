import express, { Router } from 'express';
import * as controllers from '../controllers/orderController';
import { authenticateUser, authorizeUser } from '../middlewares/auth';

const order: Router = express.Router();

order.get('/', authenticateUser, authorizeUser, controllers.getOrders);
order.get('/:id', authenticateUser, authorizeUser, controllers.getOrderById);

export default order;
