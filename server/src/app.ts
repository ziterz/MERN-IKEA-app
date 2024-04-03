import 'dotenv/config'
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './routes/router';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/products', router);

export default app;