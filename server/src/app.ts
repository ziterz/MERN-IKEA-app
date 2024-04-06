import express, { Application, json } from 'express';
import cors from 'cors';
import user from './routes/user';
import category from './routes/category';
import product from './routes/product';
import cart from './routes/cart';
import order from './routes/order';

const app: Application = express();

const corsOptions = {
  origin: ['http://localhost:5173'],
  headers: ['Content-Type'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(json());
app.use('/api/', user);
app.use('/api/categories', category);
app.use('/api/products', product);
app.use('/api/carts', cart);
app.use('/api/orders', order);

export default app;
