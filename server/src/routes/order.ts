import express, { Router } from 'express';
import * as controllers from '../controllers/orderController';

const order: Router = express.Router();

order.get('/', controllers.getOrders);
order.get('/:id', controllers.getOrderById);

export default order;
