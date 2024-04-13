import 'dotenv/config';
import express, { Application, json, urlencoded } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import user from './routes/user';
import category from './routes/category';
import product from './routes/product';
import cart from './routes/cart';
import order from './routes/order';
import { errorHandler } from './middlewares/errorHandler';

const app: Application = express();

const corsOptions = {
  origin: ['http://localhost:5173'],
  headers: ['Content-Type'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
};

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log('Connected to MongoDB Successfully');
};

connect().catch((err) => console.log(err));

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api/auth', user);
app.use('/api/categories', category);
app.use('/api/products', product);
app.use('/api/carts', cart);
app.use('/api/orders', order);
app.use(errorHandler);

export default app;
