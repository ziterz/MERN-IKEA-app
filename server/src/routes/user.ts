import express, { Router } from 'express';
import * as controllers from '../controllers/userController';
import { authenticateUser } from '../middlewares/auth';

const user: Router = express.Router();

user.post('/register', controllers.register);
user.post('/login', controllers.login);
user.get('/validate-token', authenticateUser, controllers.validateToken);

export default user;
