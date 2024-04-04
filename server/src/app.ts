import express, { Application, json } from 'express';
import cors from 'cors';
import router from './routes/router';

const app: Application = express();

const corsOptions = {
  origin: ['http://localhost:5173'],
  headers: ['Content-Type'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(json());
app.use('/products', router);

export default app;
