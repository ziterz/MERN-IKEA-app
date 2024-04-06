import express, { Router } from 'express';
import * as controllers from '../controllers/categoryController';

const category: Router = express.Router();

category.post('/categories', controllers.addCategory);
category.get('/categories', controllers.getCategories);
category.get('/categories/:id', controllers.getCategoryById);
category.put('/categories/:id', controllers.updateCategory);
category.delete('/categories/:id', controllers.deleteCategory);

export default category;
