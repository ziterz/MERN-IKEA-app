import express, { Router } from 'express';
import * as controllers from '../controllers/userController';

const user: Router = express.Router();

user.post('/register', controllers.register);
user.post('/login', controllers.login);

export default user;
