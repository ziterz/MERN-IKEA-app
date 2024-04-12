import express, { Router } from 'express';
import * as controllers from '../controllers/categoryController';
import { authenticateUser, authorizeAdmin } from '../middlewares/auth';

const category: Router = express.Router();

category.post('/', authenticateUser, authorizeAdmin, controllers.addCategory);
category.get('/', controllers.getCategories);
category.get('/:id', controllers.getCategoryById);
category.put(
  '/:id',
  authenticateUser,
  authorizeAdmin,
  controllers.updateCategory
);
category.delete(
  '/:id',
  authenticateUser,
  authorizeAdmin,
  controllers.deleteCategory
);

export default category;
