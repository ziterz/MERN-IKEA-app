import express, { Router } from 'express';
import * as controllers from '../controllers/categoryController';

const category: Router = express.Router();

category.post('/', controllers.addCategory);
category.get('/', controllers.getCategories);
category.get('/:id', controllers.getCategoryById);
category.put('/:id', controllers.updateCategory);
category.delete('/:id', controllers.deleteCategory);

export default category;
