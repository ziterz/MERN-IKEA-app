import express, { Router } from 'express';
import * as controllers from '../controllers/categoryController';
import { authentication, adminOnly } from '../middlewares/auth';

const category: Router = express.Router();

category.post('/', authentication, adminOnly, controllers.addCategory);
category.get('/', controllers.getCategories);
category.get('/:id', controllers.getCategoryById);
category.put('/:id', authentication, adminOnly, controllers.updateCategory);
category.delete('/:id', authentication, adminOnly, controllers.deleteCategory);

export default category;
